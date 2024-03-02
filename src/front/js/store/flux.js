
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      api: "https://literate-parakeet-jj5754r5r9r935pw6-3001.app.github.dev/api/",
      apiUrl: "http://localhost:3001/api",
      publicaciones: [],
      allResidents: [],
      nameUnitCreated: null,
      users: [],
      reservaciones:[]
    },
    actions: {
      addUnit: async (newUnitUser) => {
        try {
          if(!newUnitUser.email || !newUnitUser.password || !newUnitUser.nombre_unidad || !newUnitUser.nit 
            || !newUnitUser.direccion || !newUnitUser.telefono || !newUnitUser.nombres_admin || !newUnitUser.apellidos 
            || !newUnitUser.celular || !newUnitUser.cedula){
            alert("Porfavor, Completa todos los campos") 
            return(false);
          }
          const store = getStore();
          const response = await fetch(store.apiUrl + "/registration", {
            method: "POST",
            body: JSON.stringify(newUnitUser),
            headers: {
              "Content-Type": "application/json",
            },
          });
          let data = await response.json();
          setStore({...store, nameUnitCreated: data.nombre_unidad});
          return(true);
        } catch (e) {
          console.error(e);
        }
      },

      addUser: async (newUser) => {
        try {
          if(!newUser.torre || !newUser.num_apto || !newUser.tipo || !newUser.nombres || !newUser.apellidos || !newUser.celular
            || !newUser.cedula || !newUser.email || !newUser.password){
              alert("Porfavor, Completa todos los campos") 
            return(false);
            }
          const store = getStore();
          const response = await fetch(store.apiUrl + "/userRegister", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response);
          let data = await response.json();
          setStore({...store, nameUserCreated: data.nombres});
          return(true);
        } catch (e) {
          console.error(e);
        }
      },

      login: async (newUser) => {
        const store = getStore();
        const response = await fetch(store.apiUrl + "/login", {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            "Content-Type": "application/json",
          }
        })
        const data = await response.json();
        if (response.ok) 
        {
          setStore({user:data.user})
          localStorage.setItem("token", data.token)
          return true;
        }
        else{
          return false;
        }
        
      },

      addPublicacion: async (publicando) => {
        console.log(publicando);
        const store = getStore();
        console.log(store.publicaciones);
        const response = await fetch(store.api + "publicaciones", {
          method: "POST",
          body: JSON.stringify({
            contenido: publicando.contenido,
            unidad_residencial_id: parseInt(publicando.unidad_residencial_id),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          getActions().getPublicaciones();
        }
        console.log(await response.json());
      },
      getPublicaciones: async () => {
        const store = getStore();
        const response = await fetch(store.api + "publicaciones/1");
        const allPosts = await response.json();
        setStore({ publicaciones: allPosts });
        console.log(allPosts);
      },

      addReservaciones: async () => {
        const store = getStore()
        const response = await fetch(store.api + 'reservas', {
          method: "POST",
          body: JSON.stringify({descripcion: reservacion.descripcion,
          personas: parseInt(reservacion.personas),
          inicio: reservacion.fecha}),
          headers: {
            "Content-Type": "application/json",
          }
        })
        if(response.ok){
          console.log(await 'todo correcto')
        }
      },


      getAllResidentsByStatus: async (unidad_residencial_id, estado) => {
        const store=getStore();
        const response = await fetch(`${store.apiURL}/estadopendiente/${unidad_residencial_id}/${estado}`)
        const data = await response.json()
        setStore({users : data.users})
        console.log(data.users)
      
      }, 

      putUpdatedStatus: async (residente_id, selectedStatus) => {
        const store=getStore();
        const response =await fetch (`${store.apiURL}/actualizarestado/${residente_id}` , 
        {
          method: 'PUT',
          body: JSON.stringify({estado : selectedStatus}),
          headers:{
            "Content-Type": "application/json",

          }
         
        });
        if (response.ok) return true
        return false
      }
    },
  };
};

export default getState;

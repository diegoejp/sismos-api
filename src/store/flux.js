// Este archivo es para almacenar variables y funciones globales
//Esta es simplkeente una fx que retorna eso :)
const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            sismos : []
        },
        actions: {
            cargarFecha: (url)=>{
                fetch(url)
                .then((response)=>{
                    return response.json()
                })
                .then((data)=>{
                    console.log(data);
                    setStore({
                        sismos:data
                    })
                })
            }
        }
    }
}

export default getState;
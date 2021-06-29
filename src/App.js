import { useContext, useEffect } from 'react';
import './App.css';
import injectContext from './store/appContext';
import { Context } from './store/appContext';

function App() {
  const {store,actions} = useContext(Context);
  const{sismos} = store;
  useEffect(()=>{
    actions.cargarFecha("https://api.xor.cl/sismo/?fecha=20210629")
  },[])
  
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Sismos Chile</h1>
          </div>
          <div className="col-md-4">
            <h2>Ingresa Fecha</h2>
          </div>
          <div className="col-md-8">
            <h2>Resultados</h2>
            {
              !!sismos&&
              sismos.map((sismo)=>{
                return(
                  <>
                  <p>Magnitud = {sismo.magnitudes[0].magnitud}</p>
                  <p>Hora: {sismo.fechaLocal}</p>
                  <p>Lugar: {sismo.geoReferencia}</p>
                  
                  </>
                )
              })

            }
          </div>
        </div>
      </div>
    </>
  );
}

export default injectContext(App);

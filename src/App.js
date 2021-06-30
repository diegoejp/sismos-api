import { useContext, useEffect, useState } from 'react';
import './App.css';
import injectContext from './store/appContext';
import { Context } from './store/appContext';

function App() {
  const { store, actions } = useContext(Context);
  const { sismos } = store;
  /*  useEffect(() => {
     actions.cargarFecha("https://api.xor.cl/sismo/?fecha=20210629")
   }, []) */
  const [inputFecha, setInput] = useState();
  const ingresarFecha = (fecha) => {
    setInput(fecha)
  }
  const consultarsismos = () => {
    actions.cargarFecha(`https://api.xor.cl/sismo/?fecha=${inputFecha}`)
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-5 display-1">Consulta Sismos por Fecha Chile</h1>
          </div>
          <div className="col-md-3">
            <h2>Ingresa Fecha</h2>
            <p>Formato : YYYYMMDD</p>
            <p>Ejemplo: 20200312</p>
            <input className="input-group-text mb-2" type="text"
              onChange={(e) => {
                ingresarFecha(e.target.value)
              }}
            />
            <button className="btn btn-primary"
              onClick={consultarsismos}
            >Analizar Fecha</button>
          </div>
          <div className="col-md-9">
            <h2>Resultados: {sismos.length}</h2>
            <div className="accordion" id="accordionExample">
              {
                !!sismos &&
                sismos.map((sismo, index) => {
                  return (
                    <>
                      <div className="accordion-item mb-4"
                        key={index}>
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="accordion-button collapsed fs-5"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={"#collapse" + index}
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Magnitud: {sismo.magnitudes[0].magnitud} Ubicación: {sismo.geoReferencia} Hora Local: {sismo.fechaLocal.substring(11)}
                          </button>
                        </h2>
                        <div
                          id={"collapse" + index}
                          className="accordion-collapse collapse"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                           <div className="row">
                             <div className="col-6">
                               <img className="img-fluid w-100" src={sismo.imagen} alt="" />
                             </div>
                             <div className="col-6">
                               <ul className="list-group mt-5">
                                  <li className="list-group-item fs-2"><strong>Magnitud:</strong> {sismo.magnitudes[0].magnitud} ML</li>
                                  <li className="list-group-item fs-2"><strong>Latitud:</strong> {sismo.latitud}</li>
                                  <li className="list-group-item fs-2"><strong>Longitud:</strong> {sismo.longitud}</li>
                                  <li className="list-group-item fs-2"><strong>Profundidad:</strong> {sismo.profundidad}</li>
                                  <li className="list-group-item fs-2"><strong>Geo Referencia:</strong> {sismo.geoReferencia}</li>
                               </ul>
                             </div>
                           </div>

                          </div>
                        </div>
                      </div>
                    </>
                  )
                })
              }
            </div>

          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <footer>
              <h2 className="lead">
                Creado por ®diegoejp Todos los derechs reservados.😎
              </h2>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}

export default injectContext(App);

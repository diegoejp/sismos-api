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
            <h1 className="text-center mb-5">Consulta Sismos por Fecha Chile</h1>
          </div>
          <div className="col-md-2">
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
          <div className="col-md-10">
            <h2>Resultados: {sismos.length}</h2>
            <div className="accordion" id="accordionExample">
              {
                !!sismos &&
                sismos.map((sismo, index) => {
                  return (
                    <>
                      <div className="accordion-item"
                        key={index}>
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="accordion-button collapsed"
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
                            <div className="card mb-3" style={{ maxWidth: 540 }}>
                              <div className="row g-0">
                                <div className="col-md-4">
                                  <img src={`${sismo.imagen}`} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                  <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">
                                      This is a wider card with supporting text below as a natural lead-in
                                      to additional content. This content is a little bit longer.
                                    </p>
                                    <p className="card-text">
                                      <small className="text-muted">Last updated 3 mins ago</small>
                                    </p>
                                  </div>
                                </div>
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
      </div>
    </>
  );
}

export default injectContext(App);

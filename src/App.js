import { useContext, useEffect } from 'react';
import './App.css';
import injectContext from './store/appContext';
import { Context } from './store/appContext';

function App() {
  const { store, actions } = useContext(Context);
  const { sismos } = store;
  useEffect(() => {
    actions.cargarFecha("https://api.xor.cl/sismo/?fecha=20210629")
  }, [])

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


            <div className="accordion" id="accordionExample">
              {
                !!sismos &&
                sismos.map((sismo,index) => {
                  return (
                    <>
                      <div className="accordion-item"
                      key={index}>
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="accordion-button"
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
                          id={"collapse"+ index}
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by
                            default, until the collapse plugin adds the appropriate classes that we
                            use to style each element. These classes control the overall appearance,
                            as well as the showing and hiding via CSS transitions. You can modify
                            any of this with custom CSS or overriding our default variables. It's
                            also worth noting that just about any HTML can go within the{" "}
                            <code>.accordion-body</code>, though the transition does limit overflow.
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

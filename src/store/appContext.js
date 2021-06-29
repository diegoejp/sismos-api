//acá se crea el contexto y se exporta para usarlo

import { createContext, useEffect, useState } from "react";
import getState from "./flux";

export const Context = createContext(null);

//Creamos funcion injextContext que sera la encargada de aplicar el contexto al parametro que queramos

const injectContext = PassedComponent => {
    //Creamos un componente que envuelve lo que estoy pasadno como parametro con el Store
    // y el Context.Provider pasara la info al componente que yo quiera
    const StoreWrapper = props => {

        const [state, setState] = useState(getState({
            getStore: () => state.store,
            getActions: () => state.actions,
            setStore: updateStore => setState({
                store: Object.assign(state.store, updateStore),
                actions: { ...state.actions }
            })
        }));

        useEffect(() => {
            //En el caso que quiera usar alguna funcionalidad al momento de cargar la pagina
        }, [])

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        )
    }
    return StoreWrapper;
}

export default injectContext;
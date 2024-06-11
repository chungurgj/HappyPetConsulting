import { createContext, useContext, useState } from "react";


const ConsContext = createContext()

export const ConsProvider = ({children}) =>{

    const [selectedCons,setSelectedCons] = useState()

    const addSelectedCons = (value) =>{
        setSelectedCons(value)
    }

    return <ConsContext.Provider value={{selectedCons,addSelectedCons}}>
        {children}
    </ConsContext.Provider>
}

export const useCons = () =>{
    return useContext(ConsContext)
}

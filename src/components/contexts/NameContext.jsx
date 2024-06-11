import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


const NameContext = createContext()

export const NameProvider=({children})=>{


    const [id,setId] = useState(()=>{
        return localStorage.getItem("id")
    })

    const [roles,setRoles] = useState(()=>{
        return localStorage.getItem("roles")
    })

    const [password,setPassword] = useState(()=>{
        return localStorage.getItem("password")
    })

    const [loggedIn,setLoggedIn] = useState(()=>{
        return localStorage.getItem("loggedIn") === "true"
    })
   
    const [email,setEmail] = useState(()=>{
        return localStorage.getItem("email")
    })

    const [name,setName] = useState(()=>{
        return localStorage.getItem("name")
    })
    
    const addName = (nameValue) =>{
        setName(nameValue)
        localStorage.setItem("name",nameValue)
    }
    const addPassword = (passwordValue) =>{
        setPassword(passwordValue)
        localStorage.setItem("password",passwordValue)
    }

    const addId = (myid) =>{
        localStorage.setItem("id",myid)
        setId(myid)
    }

    const addEmail = (emailValue) =>{
        setEmail(emailValue)

        localStorage.setItem("email",emailValue)
    }

    const addRole = (value) =>{
        setRoles(value)
        localStorage.setItem("roles",value)
        
    }

    const isLoggedIn =(value,idValue,emailValue,nameValue)=>{
        setLoggedIn(value==='true')
        addId(idValue)
        addEmail(emailValue)
        addName(nameValue)
        localStorage.setItem("loggedIn",value)

      
    }

    return (
        <NameContext.Provider value={{isLoggedIn,loggedIn,addEmail,email,addPassword,password,addId,id,roles,addRole,name}}>
            {children}
        </NameContext.Provider>
    )
}

export const useName = () =>{
   return useContext(NameContext)
}
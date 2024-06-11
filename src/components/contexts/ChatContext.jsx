import { createContext, useContext ,useState} from "react";

const ChatContext = createContext()

export const ChatProvider = ({children}) =>{
    const [connection,setConnection] = useState('')

    const addConnection = (con) =>{
        setConnection(con)
    }
    return (
        <ChatContext.Provider value={{connection,addConnection}}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = ()=>{
    return useContext(ChatContext)
}
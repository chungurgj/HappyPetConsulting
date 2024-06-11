
  export const receiveMessage = async (user,message,id,setMessages) =>{
    newConnection.on("ReceiveMessage", (user, message)=>{
        setMessages(messages=>[...messages,{user,id,message}])
    })
  }
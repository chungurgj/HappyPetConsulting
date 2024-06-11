export const joinRoom = async (connection,name,roomId,vet)=>{
    try{
        if(connection && name && roomId){
            await connection.invoke('JoinRoom',{user:name , room:roomId,vet:vet})
            .then(()=>{
                console.log("Successfully joined room")
            })
        }
       
    }
    catch(err){
        console.error(err)
    }
}


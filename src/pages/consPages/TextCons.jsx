import React, { useState, useEffect } from 'react';
import { useNavigate, useOutlet, useParams } from 'react-router-dom';
import { useName } from '../../components/contexts/NameContext';
import { joinRoom } from '../../components/services/ChatService';
import { useChat } from '../../components/contexts/ChatContext';
import ModalLoading from '../../components/modals/ModalLoading';
import Chat from '../../components/chat/Chat';
import axios from 'axios';
import {toast} from 'react-toastify';
import ConsRightSidebar from '../../components/user/ConsRightSidebar';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useOutletContext } from 'react-router-dom';
import { useLocation, matchPath} from 'react-router-dom';
const TextCons = () => {
  const [connection,setConnection] = useState('')
  const { name, email } = useName();
  const { consId } = useParams();
  const [roomJoined,setRoomJoined] = useState(false)
  const [loading, setLoading] = useState(false);
  const [messages,setMessages] = useState([])
  const [vet,setVet] = useState('')
  const navigate = useNavigate();
  const [refresh,setRefresh] = useOutletContext()

  const location = useLocation()

  useEffect(()=>{
    console.log(connection)
  },[connection])

  useEffect(()=>{
    if(consId){
      axios.get(`https://localhost:7176/api/Consultation/text?today=true&done=false&consId=${consId}`)
        .then(response=>{
          console.log("EVE TI ",response.data)
          const checkResponse = response.data
          const vetName = response.data.vet_Name
          console.log("eveeeeeeeeeeeeee ",response.data.vet_Name)
          setRefresh(!refresh)
          if(response.data){
            if(connection && (name || email) && consId && vetName){
              setVet(vetName)

              if( checkResponse.length>0){
                joinRoom(connection,name||email,consId,vetName)
                  .then(()=>{
                    setRoomJoined(true)
                    setRefresh(!refresh)
                  })
                  .catch(err=>{
                    console.error(err)
                    navigate('/consultation/text')
                    roomJoined(false)
                  })
              }
              else{
                navigate('/consultation/text')
                roomJoined(false)
              }
              
            }
          }
        })
        .catch(err=>{
          console.error(err)
        })
    }
  },[consId,connection,name,email,navigate])


  
  useEffect(() => {
    const startConnection = async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7138/chat')
        .configureLogging(LogLevel.Information)
        .build();

      try {
        await newConnection.start();
        setConnection(newConnection);
        console.log('Connection established.');

        if (name || email) {
          joinRoom(newConnection, name || email, consId, vet)
            .then(() => {
              setRoomJoined(true);
              console.log('Joined room.');
            })
            .catch((error) => {
              console.error('Error joining room:', error);
              setRoomJoined(false)
            });
        }
      } catch (error) {
        console.error('Error starting connection:', error);
      }
    };

    startConnection();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [name, email, consId, vet]);

  useEffect(() => {
    if (connection) {
      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, { message, user}]);
      });

      connection.onclose(()=>{
        console.log("Connection is closed")
      })

      connection.on("EndConsultation",(consId)=>{
        if(consId){
          axios.put('https://localhost:7176/api/Consultation/update-status',{
            id:consId,
            done:true
          })
            .then(()=>{
              console.log("Consultation ended and set to done")
              setRefresh(!refresh)
                .then(()=>{
                  navigate('/consultation/text')
                })
             
            })
            .catch(err=>console.error(err))
        }
        else{
          console.log("No cons id")
        }
          
      })
    }
    return () => {
      if (connection) {
        connection.off("ReceiveMessage");
      }
    };
  }, [connection]);

  useEffect(()=>{
    console.log("SHOULD REFREHS")
  },[refresh])
  
  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message)
        .then(()=>{
          console.log(message)
        })
        .catch(err=>console.error(err))
      
    } catch (err) {
      console.error(err);
    }
  };
  const leaveConsultation = async () => {
    try {
      await connection.invoke("LeaveConsultation");
      setTimeout(() => {
        navigate('/consultation/text');
      }, 700);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    if(connection && (name || email) && consId && roomJoined === true && vet){
      setLoading(false)
    }
  },[connection,name,email,consId,roomJoined,vet])

  const isTextRoute = matchPath('/consultation/text/chat/:id',location.pathname)

  useEffect(() => {
    if (isTextRoute) {
      document.body.classList.add('textcons')
    } else {
      document.body.classList.remove('textcons')
    }
    return () => {
      document.body.classList.remove('textcons')
    }
  }, [isTextRoute,location.pathname])

  return (
    <div className='consultation-main temp2'>
      <ModalLoading open={loading}  /> 
      
        <div className="consultation-chat">
        <Chat messages={messages} sendMessage={sendMessage}
          closeConnection={leaveConsultation}  vet={vet}/>
        </div>
        <ConsRightSidebar consId={consId}/>
    </div>
  );
};

export default TextCons;

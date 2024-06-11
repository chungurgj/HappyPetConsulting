import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Chat from '../../components/chat/Chat'
import { useName } from '../../components/contexts/NameContext'
import VetRightSide from '../../components/vet/VetRightSide'
import {toast} from 'react-toastify'
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ModalLoading from '../../components/modals/ModalLoading'
import { joinRoom } from '../../components/services/ChatService'
import ConsRightSidebar from '../../components/user/ConsRightSidebar'

const TodaysConsultations = () => {
   const [connection,setConnection] = useState('')
   const {consId} = useParams()
   const [loading,setLoading] = useState(true)
   const [messages,setMessages] = useState([])
   const [client,setClient] = useState('')
   const [pet,setPet] = useState('')
   const {name} = useName()
   const [roomJoined,setRoomJoined] = useState(false)
   const navigate = useNavigate()

   useEffect(()=>{  
    axios.get(`https://localhost:7176/api/Consultation/consultation/${consId}`)
      .then(response=>{
        if(response.data){
          const owner = response.data.owner_Name || response.data.owner_Email
          setPet(response.data.pet_Name)
          setClient(owner)
          if(connection && client && consId){
            joinRoom(connection, owner, consId,name)
            .then(() => {
                setRoomJoined(true)
            })
            .catch((error) => {
              console.error('Error joining room:', error);
              setRoomJoined(false)
            });
          } 
          else{
            setRoomJoined(false)
          }
        }
        
      })
      .catch(err=>{
        console.error(err)
        setRoomJoined(false)
        navigate('/vet/consultations/today/text')
        toast.error("Оваа консултација не постои")
      })
  },[])

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
  
          if (client) {
            joinRoom(newConnection, name, consId, name )
              .then(() => {
                setRoomJoined(true);
                console.log('Joined room.');
              })
              .catch((error) => {
                console.error('Error joining room:', error);
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
    }, [client,consId,pet]);
  
    useEffect(() => {
      if (connection) {
        connection.on("ReceiveMessage", (user, message) => {
          setMessages(messages => [...messages, { message, user}]);
        });
  
        connection.onclose(()=>{
          console.log("Connection is closed")
        })
      }
      return () => {
        if (connection) {
          connection.off("ReceiveMessage");
        }
      };
    }, [connection]);

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
    const endConsultation = async () => {
      try {
        await connection.invoke("EndConsultation",consId);
        await connection.invoke("RefreshTextCons")
        setTimeout(() => {
          navigate('/vet/consultations/today');
        }, 700);
      } catch (err) {
        console.error(err);
      }
    };

    useEffect(()=>{
      if(connection && client && consId && roomJoined === true  && name){
        setLoading(false)
      }
    },[connection,name,client,consId,roomJoined,pet,client])

  return (
    <div className='consultation-main'>
    <ModalLoading open={loading}  /> 
      <div className="consultation-chat">
      <Chat messages={messages} sendMessage={sendMessage} endConsultation={endConsultation}  client={client} pet={pet}/>
      </div>
      <ConsRightSidebar consId={consId}/>
  </div>
  
  )
}

export default TodaysConsultations

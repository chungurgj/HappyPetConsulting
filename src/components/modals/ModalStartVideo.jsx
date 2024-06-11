import React, { useEffect, useState } from 'react'
import  ReactDOM  from 'react-dom'
import Close from '../../img/close.png'
import axios from 'axios'
import { fixMinutes } from '../services/TimeService'
import { useName } from '../contexts/NameContext'
import { HubConnectionBuilder,LogLevel } from '@microsoft/signalr'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ModalStartVideo = ({open,onClose,selectedVideo,newDate}) => {
    
    const [consData,setConsData] = useState({})
    const [time,setTime ] = useState('')
    const [date,setDate] = useState('')
    const [createdTime,setCreatedTime] = useState('')
    const [createdDate,setCreatedDate] = useState('')
    const [btnDisabled,setBtnDisabled] = useState(true)

    const {id} = useName()
    const [connection,setConnection] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
    const connection = new HubConnectionBuilder()
        .withUrl(`https://localhost:7176/notify?userId=${id}`)
        // .withHubProtocol(new SignalR.HttpHubProtocol())
        .configureLogging(LogLevel.Information)
        .build()

    setConnection(connection)

    connection.on("ConsultationStarted", (message) => {
        toast.success(`${message} started`)
        console.log("messa ",message)
    })

    connection.start()
        .then(() => {
          // connection.send("SendUserId", id)
          console.log("SignalR connection started")
        })
        .catch(err => {
            console.error("SignalR connection error:", err)
        })

    return () => {
        if (connection) {
            connection.stop()
                .then(() => console.log("SignalR connection stopped"))
                .catch(err => console.error("Error stopping SignalR connection:", err))
        }
    }
}, [])


    useEffect(()=>{
      if(selectedVideo){
        axios.get(`https://localhost:7176/api/Consultation/consultation/${selectedVideo}`)
            .then(response=>{
                console.log(response.data)
                setConsData(response.data)

                const datetime = new Date(response.data.consultationStart)
                const hour = datetime.getHours()
                var minutes = datetime.getMinutes()
                const day = datetime.getDate()
                const month = datetime.getMonth() + 1
                const year = datetime.getFullYear()

                minutes = fixMinutes(minutes)
                setTime(`${hour}:${minutes}`)
                setDate(`${day}/${month}/${year}`)

                const createdDateTime = new Date(response.data.created)
                const createdHour = createdDateTime.getHours()
                var createdMinutes = createdDateTime.getMinutes()
                const createdDay = createdDateTime.getDate()
                const createdMonth = createdDateTime.getMonth() + 1
                const createdYear = createdDateTime.getFullYear()

                createdMinutes = fixMinutes(createdMinutes)
                setCreatedTime(`${createdHour}:${createdMinutes}`)
                setCreatedDate(`${createdDay}/${createdMonth}/${createdYear}`)
              })
            .catch(err=>console.error(err))
          }
    },[selectedVideo])

useEffect(()=>{
    if(open)
        document.body.style.overflowY ='hidden'
    else
        document.body.style.overflowY = 'scroll'
    },[open])

    useEffect(() => {
      if (consData && consData.consultationStart) {
          const now = new Date(newDate);
          const passed = new Date(now.getTime() + 30 * 60000); // Adding 30 minutes to current time
          const consultationStart = new Date(consData.consultationStart);

          if (now >= consultationStart && now < passed) {
              setBtnDisabled(false);
          } else {
              setBtnDisabled(true);
          }
      }
  }, [consData,newDate]);
  
  const startVideoCons =() =>{
    axios.put(`https://localhost:7176/api/Consultation/start-consultation?consId=${selectedVideo}&userId=${id}`)
      .then(response=>{
        connection.invoke("StartConsultation",selectedVideo,id)
        navigate('/consultation/video/chat')
        onClose()
      })
      .catch(err=>console.error(err))
  }
    
  return ReactDOM.createPortal(
    <>
      {open && (
        <div className='overlay'>
          <div className='modal-container '>
            <div className='modal-container-header'>
                <h5>Ваша консултација</h5>
                <img onClick={onClose} src={Close} height={30} width={30} className='close-button' alt='close-button' />    
            </div>
            <div className='modal-main move-down'>
             {consData && <div>
              <p>Милениче: {consData.pet_Name}</p>
              <p>Закажан за: {date} <strong>{time}</strong></p>
              <p>Закажан на: {createdDate} <strong>{createdTime}</strong></p>
              <div className='btnstart-sep'>
              <hr />
              <button className='btn btn-success startvideo-btn' onClick={()=>startVideoCons()} disabled={btnDisabled}>Започни </button>
              
              <small>*Можете да започнете само кога ќе дојде вашиот термин.</small>
              </div>
          </div>}
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('start-video')
  )
}

export default ModalStartVideo

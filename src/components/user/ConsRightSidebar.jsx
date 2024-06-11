import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { calculatePastTime, combineDateAndTime, combineHoursAndMin } from '../services/TimeService'
import ModalLoading from '../modals/ModalLoading'
const ConsRightSidebar = ({consId}) => {
  const [vet,setVet] = useState('')
  const [pet,setPet] = useState('')
  const [created,setCreated] = useState('')
  const [start,setStart] = useState('')
  const [timePassed,setTimePassed] = useState('')
  const [showScheduledTime,setShowScheduledTime] = useState(true)
  const [description,setDescription] = useState('')
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    axios.get(`https://localhost:7176/api/Consultation/consultation/${consId}`)
      .then(response=>{
        const data = response.data
        setVet(data.vet_Name)
        setPet(data.pet_Name)
        const createdDate = new Date(data.created)
        setCreated(combineDateAndTime(createdDate))
        const startDate = new Date(data.consultationStart)
        setStart(combineDateAndTime(startDate))
        data.type_Id === 1 ? setShowScheduledTime(false) : setShowScheduledTime(true)
        setDescription(data.des)
        
        const intervalId = setInterval(() => {
          setTimePassed(calculatePastTime(createdDate));
      }, 1000);
  
      return () => clearInterval(intervalId);
      })
      .catch(err=>console.error(err))
  },[])

  useEffect(()=>{
    if(vet && pet && created && start && timePassed && description  && consId){
      setLoading(false)
    }
  },[vet,pet,created,start,timePassed,description,consId])

  return (
    <div className='consultation-right-sidebar'>
      <ModalLoading open={loading}/>
      <div className="sidebar-padding">
       <div className="user-detail-container">
          <div className="grouper">
            <div className="ge">
              <p className='main-bold ge'>Миленик:</p>
              <p>{pet}</p>
            </div>
            <div className="ge">
              <p className='main-bold ge'>Ветеринар</p>
              <p>{vet}</p>
            </div>          
          </div>
          <div className="grouper">
            <div className="ge">
              <p className='main-bold'>Креирана во:</p>
              <p>{created}</p>
            </div>
            <div className="ge">
              <p className='main-bold'>Закажана за:</p>
              <p>{start}</p>
            </div>
          </div>
          <div className="grouper">
            <div className="ge">
              <p className='main-bold'>Времетраење:</p>
              <p>{timePassed}</p>
            </div>
          </div>
        
          

          
        </div>
        <div className="problem-container">
            <h6>Опис:</h6>
            <p>{description}</p>
        </div>
        </div>

    </div>
  )
}

export default ConsRightSidebar

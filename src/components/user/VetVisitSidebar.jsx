import React from 'react'
import Approved from '../../img/approved.png'
import Pending from '../../img/pending.png'
import Arrow from '../../img/arrow.png'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useName } from '../contexts/NameContext'
const VetVisitSidebar = ({refreshVisits}) => {
    const [openScheduledVisits,setOpenScheduledVisits] = useState(true)
    const [openPassedVisits,setOpenPassedVisits] = useState(true)
    const [visits,setVisits] = useState([])
    const [passedVisits,setPassedVisits] = useState([])

    const {id} = useName()
    const token = localStorage.getItem('token')

    const handleScheduledVisits = () =>{
    setOpenScheduledVisits(!openScheduledVisits)
    }

    const handlePassedVisits = () =>{
    setOpenPassedVisits(!openPassedVisits)
    }
    
    const fetchVetVisits = () =>{
        axios.get(`https://localhost:7176/api/VetVisit/${id}`,{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
            .then(response=>{
              var current = new Date()
              var yetToComeVisits = response.data.filter(aps=>{
                var date = new Date(aps.dateTimeStart)
                return date > current
              })
              setVisits(yetToComeVisits)
      
              var passedVisits = response.data.filter(aps=>{
                var date = new Date(aps.dateTimeStart)
                return date < current
              })
              setPassedVisits(passedVisits)
      
            })
            .catch(error=>{
              console.error(error)
            })
    }
    useEffect(()=>{
       fetchVetVisits()
      },[refreshVisits])

    return (
        <div className='vetvisits-left-sidebar'>
            <div className="vetvisits-left-content">
            <div className="horizontal">
                <h6>Закажани прегледи </h6>
                <img src={Arrow} height={17} width={17} className='arrow-image' onClick={handleScheduledVisits}/>
                </div>
                <div className={`scheduledvisits ${openScheduledVisits ? 'open' : 'closed'}`}>
                {visits.length >0 ? visits.map((visit,index)=>{
                    var dateAndTime = new Date(visit.dateTimeStart)
                    var hour = dateAndTime.getHours()
                    var minutes = dateAndTime.getMinutes() === 0 ? '00' : dateAndTime.getMinutes()
                    var month = dateAndTime.getMonth()
                    var day = dateAndTime.getDate()
                    var year = dateAndTime.getFullYear()
                    var status = visit.approved === true ? Approved : Pending 
                    
                    return (<div key={index} className='vet-visit-group'>
                    <div className='ap'>
                        <div className="ap-main vv">
                        <p>{visit.pet_Name}</p>
                        <p>{hour}:{minutes} {month+1}/{day}/{year}</p>
                        </div>

                        <img src={status} height={20} width={20} className='margin-image'  title={visit.approved === true ? 'Прегледот е одобрен од ветеринар' 
                        : 'Прегледот чека одобрување од ветеринар'}/>
                    </div>
                    </div>)

                }) : <p>Нема закажани прегледи</p>}
                </div>
                
                <div className="horizontal">
                <h6>Поминати прегледи </h6>
                <img src={Arrow} height={17} width={17} className='arrow-image' onClick={handlePassedVisits}/>
                </div>
                <div className={`passedvisits ${openPassedVisits ? 'open' : 'closed'}`}>
                {passedVisits.length >0 ? passedVisits.map((visit,index)=>{
                    var dateAndTime = new Date(visit.dateTimeStart)
                    var hour = dateAndTime.getHours()
                    var minutes = dateAndTime.getMinutes() === 0 ? '00' : dateAndTime.getMinutes()
                    var month = dateAndTime.getMonth()
                    var day = dateAndTime.getDate()
                    var year = dateAndTime.getFullYear()
                    var status = visit.approved === true ? Approved : Pending 
                    
                    return (<div className='vet-visit-group'>
                    <div className='ap'>
                        <div className="ap-main vv">
                        <p>{visit.pet_Name}</p>
                        <p>{hour}:{minutes} {month+1}/{day}/{year}</p>
                        </div>
                    </div>
                    </div>)

                }) : <p>Нема поминати прегледи</p>}
                </div>
            </div>
        </div>
    )
    }

    export default VetVisitSidebar

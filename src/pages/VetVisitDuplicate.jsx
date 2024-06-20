import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useName } from '../components/contexts/NameContext'
import ModalAddPet from '../components/modals/ModalAddPet'
import Arrow from '../img/arrow.png'
import {toast} from 'react-toastify'
import Approved from '../img/approved.png'
import Pending from '../img/pending.png'
import DateTimeSidebar from '../components/user/DateTimeSidebar'
import { addHours } from 'date-fns'
import { usePet } from '../components/contexts/PetContext'
const VetVisit = () => {


  const {id,loggedIn,roles} = useName()
  const {hasPet} = usePet()

  const [openModalAddPet,setOpenModalAddPet] = useState(false)
 
  const [openScheduledVisits,setOpenScheduledVisits] = useState(true)
  const [openPassedVisits,setOpenPassedVisits] = useState(true)

  const [userPets,setUserPets] = useState([])
  const [vets,setVets] = useState([])

  const [chosenPet,setChosenPet] = useState('')
  const [chosenVet,setChosenVet] = useState('')
  

  const [visits,setVisits] = useState([])
  const [passedVisits,setPassedVisits] = useState([])

  const [refreshVisits,setRefreshVisits] = useState(false)
  const [refresh,setRefresh] = useState(false)

  const [dateTime,setDateTime] = useState(null)


  const token = localStorage.getItem('token')


  const handleScheduledVisits = () =>{
    setOpenScheduledVisits(!openScheduledVisits)
  }

  const handlePassedVisits = () =>{
    setOpenPassedVisits(!openPassedVisits)
  }

  const handleChosenPet = (e) =>{
    setChosenPet(e.target.value)

  }

  const handleChosenVet = (e) =>{
    setChosenVet(e.target.value)
  }

  useEffect(()=>{
    
  },[dateTime])

  useEffect(()=>{
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


      setRefreshVisits(false)

      
  },[refreshVisits])

  useEffect(()=>{
    axios.get(`https://localhost:7176/api/Pet/by-owner/${id}`)
      .then(response=>{
        setUserPets(response.data)
        
        if(response.data.length===0){
          setOpenModalAddPet(true)
        }
        else{
          setOpenModalAddPet(false)
        }
      })
      .catch(error=>{
        console.error(error)
      })
  
      axios.get('https://localhost:7176/api/Auth/get-vets')
        .then(response=>{
          setVets(response.data)
        })
        .catch(err=>console.error(err))
  },[])

  
  const handleSchedule = () =>{
    const current = new Date().toISOString()
    const date = new Date(dateTime)
    date.setHours(date.getHours()+1)

    
    if(chosenPet && chosenVet && dateTime){
      axios.post(`https://localhost:7176/api/VetVisit`,{
        pet_Id:chosenPet,
        owner_Id:id,
        dateTimeStart:date,
        created:current,
        vet_Id:chosenVet
      })
        .then(response=>{
          console.log(response)
          toast.success("Вашиот термин е пратен за одобрување од ветеринарот!")
          setRefresh(!refresh)
        })
        .catch(err=>console.error(err))
      
  
    }
    else{
      toast.error("Ве молиме пополнете ги сите полиња!")
    }
  }

  useEffect(()=>{
    const date = new Date(dateTime)
    const hour = date.getHours()
    const minutes = date.getMinutes()

    console.log(`visits ${hour}:${minutes}`)
  },[dateTime])


  useEffect(()=>{
    if(loggedIn && hasPet==false && roles=="User"){
      setOpenModalAddPet(true)
    }
    else{
      setOpenModalAddPet(false)
    }
  },[hasPet,loggedIn,roles])

  return (
    <div className='vetvisits-container '>
      <ModalAddPet open={openModalAddPet} onClose={()=>setOpenModalAddPet(false)} noclose={true}/>
      <div className='vetvisits-left-sidebar'>
        <div className="vetvisits-left-content">
          <div className="horizontal">
            <h6>Закажани прегледи </h6>
            <img src={Arrow} height={17} width={17} className='arrow-image' onClick={handleScheduledVisits}/>
            </div>
            <div className={`scheduledvisits ${openScheduledVisits ? 'open' : 'closed'}`}>
              {visits && visits.map((visit,index)=>{
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

              })}
            </div>
            
            <div className="horizontal">
            <h6>Поминати прегледи </h6>
            <img src={Arrow} height={17} width={17} className='arrow-image' onClick={handlePassedVisits}/>
            </div>
            <div className={`passedvisits ${openPassedVisits ? 'open' : 'closed'}`}>
              {passedVisits && passedVisits.map((visit,index)=>{
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

              })}
            </div>
        </div>
      </div>
      <div className="vetvisits-main">
        <div className='vetvisits-main-content'>
          <h5>Закажување на термин</h5>
          <form onSubmit={(e)=>e.preventDefault()} className='form-vetvisits'>
             
              <select className='form-control form-control-lg bg-light fs-6 mt-4' defaultValue={'default'} onChange={(e)=>handleChosenPet(e)}>
                        <option value={'default'}>Одбери милениче</option>
                        {userPets && userPets.map(pet=>(
                          <option value={pet.id}>{pet.name}</option>
                        ))}
                      </select>
                      <select value={chosenVet} className='form-control form-control-lg bg-light fs-6 mt-3' defaultValue={'default'} onChange={(e)=>handleChosenVet(e)}>
                        <option value={'default'}>Одбери ветеринар</option>
                        {vets && vets.map(vet=>(
                          <option value={vet.id}>{vet.displayName}</option>
                          
                        ))}
                        <option value="whoever">Било кој</option>
                      </select>
            
          
                  <button className='btn btn-success zakazi mt-4' type='submit' onClick={handleSchedule}>Закажи </button>
          </form>
        </div>
      </div>
     
    <DateTimeSidebar dateandtime={setDateTime} refreshV={refresh} marg={100} type={'vetvisit'}/>
    </div>
  )
}

export default VetVisit

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useName } from '../components/contexts/NameContext'
import ModalAddPet from '../components/modals/ModalAddPet'
import {toast} from 'react-toastify'
import DateTimeSidebar from '../components/user/DateTimeSidebar'
import { addHours } from 'date-fns'
import { usePet } from '../components/contexts/PetContext'
import VetVisitSidebar from '../components/user/VetVisitSidebar'

const VetVisit = () => {
  const {id,loggedIn,roles} = useName()
  const {hasPet} = usePet()
  const [openModalAddPet,setOpenModalAddPet] = useState(false)
 
  const [userPets,setUserPets] = useState([])
  const [vets,setVets] = useState([])

  const [chosenPet,setChosenPet] = useState('')
  const [chosenVet,setChosenVet] = useState('')
  const [refresh,setRefresh] = useState(false)

  const [dateTime,setDateTime] = useState(null)

  const handleChosenPet = (e) =>{
    setChosenPet(e.target.value)

  }

  const handleChosenVet = (e) =>{
    setChosenVet(e.target.value)
  }


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
      <VetVisitSidebar/>
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

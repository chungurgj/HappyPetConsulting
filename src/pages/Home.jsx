import React, { useEffect, useState } from 'react'
import Cover from '../components/user/Cover'
import Jumbo from '../components/user/jumbo'
import Group from '../components/user/group'
import Counter from '../components/user/Counter'
import {useName} from '../components/contexts/NameContext'
import { usePet } from '../components/contexts/PetContext'
import ModalAddPet from '../components/modals/ModalAddPet'
import {toast} from 'react-hot-toast'
import axios from 'axios'

const Home = () => {
  const {loggedIn,id,roles} = useName()
  const {petDataSaved,hasPet} = usePet()

  const [openModalAddPet,setOpenModalAddPet] = useState(false)

  useEffect(()=>{
    console.log("Roles ",roles)
  },[])

  useEffect(()=>{
    if(loggedIn && hasPet==false && roles=="User"){
      setOpenModalAddPet(true)
    }
    else{
      setOpenModalAddPet(false)
    }
  },[hasPet,loggedIn,roles])
  
  
  return (

    <div className='home-wrap'>
      <ModalAddPet open={openModalAddPet} onClose={()=>setOpenModalAddPet(false)}>
      </ModalAddPet>
      <Cover/>
      <Jumbo/>
      <Group/>
      <Counter/>
    </div>
  )
}

export default Home

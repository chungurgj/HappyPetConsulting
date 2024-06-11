import React from 'react'
import VetNavbar from '../vet/VetNavbar'
import { Outlet } from 'react-router-dom'
const VetLayout = () => {
  return (
    <div className='vet-container'>
        <VetNavbar/>
        <Outlet/>
    </div>
  )
}

export default VetLayout

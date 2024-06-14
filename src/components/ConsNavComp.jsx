import React from 'react'
import { useNavigate } from 'react-router-dom'
const ConsNavComp = ({imgUrl,title,text,navLocation}) => {

    const navigate = useNavigate()

    const handleNavigate = () =>{
        navigate(navLocation)
    }
  return (
    <div className='consNavComp'>
        <div className='consGroup'>
            <img src={imgUrl} height={50} className='consNavCompImg'/>
            <h5>{title}</h5>
            
        </div>
        
     <div className='consGroup'>
        <small>{text}</small>
        <button onClick={handleNavigate} className='btn btn-success btnConsNav'>Продолжи</button>
     </div>
      
    </div>
  )
}

export default ConsNavComp

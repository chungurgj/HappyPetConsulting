import React, { useEffect, useState } from 'react'
import Arrow from '../../img/arrow.png'
import { combineDateAndTime, fixMinutes } from '../services/TimeService'
import { useNavigate } from 'react-router-dom'
const VetLeftSideComp = ({apsArr,type}) => {
    const [open,setOpen] = useState(true)
    const [apData,setApData] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        setApData(apsArr)
    },[apsArr])

    const navKey = {
      1:'text',
      2:'video',
      3:"emergency-chat"
    }
    const consType = {
        1:"Текстуални консултации",
        2:"Видео консултации",
        3:"Итни консултации"
    }

    const handleSelect = (cons) =>{
      navigate(`/vet/consultations/today/${navKey[type]}/${cons}`)
    }
  return (
    <div>
      <div className="horizontal">
            <h6>{consType[type]}</h6>
            <img src={Arrow} className='arrow-image' onClick={()=>setOpen(!open)}  height={17} width={17} />
        </div>
        <div className="video-consultations">
            <div className={`appointments ${open === true ? 'open' : 'close'}`} >
            {apData.length > 0 ? apData.map(data=>{
                const apDate = new Date(data.consultationStart)
          
              return (
                <div key={data.id} className='ap-cont' onClick={()=>handleSelect(data.id)}>
                <div className='ap-main'>
                  <p>{data.pet_Name}</p>
                  <p>{combineDateAndTime(apDate)}</p>
                </div>
              </div>
                
              )
            }) : <p className='cons-none'>Нема {consType[type].toLowerCase()}</p>}
            </div>
        </div>
    </div>
  )
}

export default VetLeftSideComp

import React, { useEffect, useState } from 'react'
import Arrow from '../../img/arrow.png'
import { fixMinutes } from '../services/TimeService'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'
const UserLeftSideComp = ({apsArr,type}) => {
    const [apData,setApData] = useState([])
    const [open,setOpen] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        setApData(apsArr)
    },[apsArr])
    
    const handleSelect = (cons) =>{
        // selectedCons(cons)
      
        axios.get(`https://localhost:7176/api/Consultation/text?today=true&done=false&consId=${cons}`)
          .then(response=>{
            if(Array.isArray(response.data) && response.data.length > 0){
              navigate(`/consultation/${navKey[type]}/chat/${cons}`)
            }
            
          })
          .catch(err=>{
  
            toast.error("Оваа консултација не постои")
          })
    }
    const navKey = {
      1:'text',
      2:'video',
      3:"emergency"
    }
    const consType = {
        1:"Текстуални консултации",
        2:"Видео консултации",
        3:"Итни консултации"
    }
  return (
    <>
    <div className='horizontal'>
              <h6>{consType[type]}</h6>
              <img src={Arrow} height={17} width={17} className='arrow-image' onClick={()=>setOpen(!open)}/>
            </div>
          <div className="scheduled">
            <div className={`appointments ${open ? 'open' : 'close'}`} >
              {apData.length>0 ? (apData.map(data=>{
                const apDate = new Date(data.consultationStart)
                const dataYear = apDate.getFullYear()
                const dataMonth = apDate.getMonth()
                const dataDay = apDate.getDate()
                const hour = apDate.getHours()
                const minutes = apDate.getMinutes()

                const category = data.type_Id 
                var categoryName = null;
                let iconColor = 'teal'

                if(category === 2){
                 iconColor='teal'
                 categoryName='Video'
                }
                else if(category === 3){
                  iconColor='coral'
                  categoryName='Emerg'
                }
                else if(category === 1){
                  iconColor='gold'
                  categoryName='Text'
                }
              return (
                <div key={data.id} className='ap-cont' onClick={()=>handleSelect(data.id)}>
                  <p className={`cat-icon ${iconColor}`}>
                    <small>{categoryName}</small>
                  </p>
                  <div className='ap-main'>
                    <p>{data.pet_Name}</p>
                    <p>{dataMonth+1}.{dataDay}.{dataYear} / {hour}:{fixMinutes(minutes)}</p>       
                    <div>
                    </div>
                  </div>
                </div>
              )
            })) : <p>Нема {consType[type].toLowerCase()}</p>}  
            </div>      
          </div>
          </>
  )
}

export default UserLeftSideComp


import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Close from '../../img/close.png'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { HubConnectionBuilder,LogLevel } from '@microsoft/signalr'
import axios from 'axios'
import { useCons } from '../contexts/ConsContext'
import { useName } from '../contexts/NameContext'
import { useOutletContext } from 'react-router-dom'

const ModalPayVideo = ({open,onClose,price,vet,pet,problemDes,date,type,refreshData}) => {
    const navigate = useNavigate()

    const [refresh,setRefresh] = useOutletContext()

    const [disabled,setDisabled] = useState(false)
    const titleType = {
      1:"Текстуална консултација",
      2:"Видео консултација",
      3:"Итна консултација"
    }


    const submitPay = () =>{
      setDisabled(true)
    axios.post('https://localhost:7176/api/Consultation',{
      pet_Id:pet,
      vet_Id:vet,
      consultationStart:date,
      type_Id:type,
      price:null,
      des:problemDes
    })
      .then((response)=>{
        setRefresh(!refresh)
        refreshData()
        toast.success("Успешно закажан термин")
        const consId = response.data.id
        if(type === 1){
          navigate(`/consultation/text/chat/${consId}`)
          console.log("it should navigate")
        }
        else{
          console.log("it doesnt want to navigate")
        }
      })
      .catch(err=>{
        toast.error(err.response)
      })
    }
  return ReactDOM.createPortal(
    <>
      {open && (
        <div className='overlay'>
          <div className='modal-container'>
            <div className='modal-container-header'>
              <h5 className='modal-header'>НАПЛАТА</h5>
              <img onClick={onClose} src={Close} height={30} width={30} className='close-button' alt='close-button' />
            </div>
            <div className='modal-main'>
              <div className='product-position'>
                <p className='modal-product-title'>{titleType[type]}</p>
                <p className='modal-product-price'>{price} ден.</p>
              </div>
              
              <button className='btn btn-success kupi-button2' onClick={submitPay} disabled={disabled}>Плати</button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('pay-video')
  )
}

export default ModalPayVideo

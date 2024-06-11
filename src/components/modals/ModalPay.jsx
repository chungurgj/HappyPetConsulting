import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Close from '../../img/close.png'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { HubConnectionBuilder,LogLevel } from '@microsoft/signalr'
import axios from 'axios'
import { useCons } from '../contexts/ConsContext'

const ModalPay = ({open,onClose,price,vet,pet,created,problemDes}) => {
    const navigate = useNavigate()
    const [connection,setConnection] = useState('')

    const {addSelectedCons} = useCons()

    useEffect(()=>{
      const newConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7138/chat')
        .configureLogging(LogLevel.Information)
        .build()

      newConnection.start()
        .then(()=>{
          setConnection(newConnection)
        })
        .catch(err=>{
          console.error(err)
        })
        
      

      return (()=>{
        newConnection.off("RefreshTextCons")
        newConnection.stop()
      })
    },[])

    useEffect(() => {
        if (open) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'visible';
        }
      }, [open]);

      const submitPay = () =>{
        const createdDate = new Date(created)
        createdDate.setHours(createdDate.getHours()+1)

          axios.post(`https://localhost:7176/api/TextConsultation`,{
            pet_Id:pet,
            vet_Id:vet,
            created:createdDate.toISOString(),
            price:0,
            des:problemDes
          })
            .then(response=>{
              console.log(response)
              addSelectedCons(response.data.id)
              connection.invoke("RefreshTextCons")
              toast.success("Процес на плаќање")
              navigate('/consultation/text/chat')
            })
            .catch(err=>console.error(err))

      }
      
      useEffect(()=>{
       
      },[])

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
                <p className='modal-product-title'>Текстуално советување  </p>
                <p className='modal-product-price'>{price} ден.</p>
              </div>
              
              <button className='btn btn-success kupi-button2' onClick={submitPay}>Плати</button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('pay')
  )
}

export default ModalPay

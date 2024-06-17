import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import Close from '../../img/close.png'

const ModalDisapprove = ({open,onClose,vetVisitId,onSubmitReason}) => {
    const [reason,setReason] = useState('')
    const [buttonDisabled,setButtonDisabled] = useState(true)

    const handleReason = (e) =>{
        setReason(e.target.value)
    }

    useEffect(()=>{
        if(reason.length>15){
            setButtonDisabled(false)
        }
        else{
            setButtonDisabled(true)
        }
    },[reason])

    const handleSubmitReason = (e) =>{
        e.preventDefault(); // prevent default form submission
        // send email logic
        axios.delete(`https://localhost:7176/api/VetVisit/${vetVisitId}?message=${reason}`)
        .then(response=>{
          toast.success("Успешно одбиен преглед")
          console.log(response.data)
          onSubmitReason()
          onClose()
        })
        .catch(error=>console.error(error))
    }
    
  return ReactDOM.createPortal (
    <>
      {open && (
        <div className='overlay'>
          <div className='modal-container'>
            <div className='modal-container-header'>
              <h5 className='modal-header'>Одбивање на преглед</h5>
              <img onClick={onClose} src={Close} height={30} width={30} className='close-button' alt='close-button' />
            </div>
            <div className='modal-main'>
                <form >
                    <textarea type='text' placeholder='Причина' className='form-control reason-box' onChange={(e)=>handleReason(e)}/>
                    <button className='btn btn-danger reason-btn' disabled={buttonDisabled} onClick={(e)=>handleSubmitReason(e)}>Испрати</button>
                </form>
              
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('disapprove-portal')
  )
}

export default ModalDisapprove

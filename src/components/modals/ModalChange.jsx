import  ReactDOM  from "react-dom"
import Close from '../../img/close.png'
import { useName } from "../contexts/NameContext"
import { toast } from "react-toastify"
import { useState } from "react"
import validator from "validator"
import axios from "axios"


const ModalChange = ({open,onClose,change}) => {
    if(open)
        document.body.style.overflow = 'hidden'
    else 
    document.body.style.overflow = 'visible'

    const {email,id,addEmail,addPassword,password} = useName()
    const [newEmail,setNewEmail] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [currentPassword,setCurrentPassword] = useState('')

    const handleNewEmail = (e) =>{
        setNewEmail(e.target.value)
    }
    const handleEmailChange = (e) =>{
        e.preventDefault()
        if(!newEmail){
            toast.error("Ве молиме пополнете го полето за нов емаил")
        }
        else{
            if(validator.isEmail(newEmail)){
                toast.success("id e ",id)
                axios.put(`https://localhost:7185/api/user/${id}`, { email: newEmail }, { headers: { 'Content-Type': 'application/json' } })
                    .then(response => {
                        console.log(response);
                        addEmail(newEmail);
                        toast.success("Успешно променет емаил");
                    })
                    .catch(error => {
                        console.error(error);
                        toast.error(error)
                    });
                
            }
            else{
                toast.error("Ве молиме внесете валиден емаил")
            }
        }
    }
    const handleNewPassword = (e) =>{
        setNewPassword(e.target.value)
    }

    const handleCurrentPassword = (e) =>{
        setCurrentPassword(e.target.value)
    }

    const handlePasswordChange = (e) =>{
        e.preventDefault()
        
    
        axios.post('https://localhost:7176/api/Auth/password-change',{
            userId:id,
            currentPassword:currentPassword,
            newPassword:newPassword
        })
        .then(response=>{
            console.log(response.data)
            toast.success("Успешно променета лозинка")
        })
        .catch(error=>{
            console.error(error)
            toast.error("Неуспешно променета лозинка")
        })
    }

  return ReactDOM.createPortal(
    <>
   
    {open && change===2  &&
        (<div className="overlay">
        <div className="modal-container">
            <div className="modal-container-header">
                <h5>Промени емаил</h5>
                <img onClick={onClose} src={Close} height={30} width={30} className='close-button' alt='close-button' />   
            </div>
            <div className="modal-main change-email">
                <p>Моментален емаил:</p>
                <p className="modal-product-price">{email}</p>
            <form >
                <div className="input-group mb-3">
                    <input type="email" className="form-control form-control-lg bg-light fs-6" placeholder="Нова емаил адреса" onChange={(e)=>handleNewEmail(e)}/>
                </div>
                <button className="btn btn-danger change-button-main" onClick={(e)=>handleEmailChange(e)}>Промени</button>
                </form>
            </div>
        </div>
      </div>)
    }
    {open && change===3  &&
        (<div className="overlay">
        <div className="modal-container">
            <div className="modal-container-header">
                <h5>Промени лозинка</h5>
                <img onClick={onClose} src={Close} height={30} width={30} className='close-button' alt='close-button' />   
            </div>
            <div className="modal-main change-email">
                
            <form >
            <div className="input-group mb-3">
                    <input type="email" className="form-control form-control-lg bg-light fs-6" placeholder="Внеси моментална лозинка" onChange={(e)=>handleCurrentPassword(e)}/>
                </div>
                <div className="input-group mb-3">
                    <input type="email" className="form-control form-control-lg bg-light fs-6" placeholder="Нова лозинка" onChange={(e)=>handleNewPassword(e)}/>
                </div>
                <button className="btn btn-danger change-button-main" onClick={(e)=>handlePasswordChange(e)}>Промени</button>
                </form>
            </div>
        </div>
      </div>)
    }
    </>,
    document.getElementById('change')
  )
}

export default ModalChange

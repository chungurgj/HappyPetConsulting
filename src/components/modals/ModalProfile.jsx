import ReactDOM from 'react-dom';
import '../style.css';
import Close from '../../img/close.png';
import { useEffect, useState } from 'react';
import {useName} from '../contexts/NameContext'
import ModalChange from './ModalChange';
const ModalProfile = ({ open, children, onClose }) => {

const {email} = useName()
const [isOpenChange,setIsOpenChange] = useState(false)
const [change,setChange] = useState(0)

useEffect(()=>{
  if(open)
    document.body.style.overflowY ='hidden'
  else
    document.body.style.overflowY = 'scroll'
},[open])
    

const handleModalChangeEmail = () =>{
  onClose()
  setIsOpenChange(true)
  setChange(2)
}
const handleModalChangePassword = () =>{
  onClose()
  setIsOpenChange(true)
  setChange(3)
}

  return ReactDOM.createPortal(
    <>
    <ModalChange open={isOpenChange} change={change} onClose={()=>setIsOpenChange(false)}/>
      {open && (
        <div className='overlay'>
          <div className='modal-container '>
            <div className='modal-container-header'>
                <h5>Ваши лични податоци</h5>
                <img onClick={onClose} src={Close} height={30} width={30} className='close-button' alt='close-button' />    
            </div>
            <div className='modal-main move-down'>
              
              <div className='info-button-group'>
                <p className='info-name-modal'>{email}</p>
                <button className='btn btn-danger modal-change-button' onClick={handleModalChangeEmail}>Промени</button>
              </div>
              <div className='info-button-group'>
              <p className='info-name-modal'>Промени лозинка</p>
                
                <button className='btn btn-danger modal-change-button' onClick={handleModalChangePassword}>Промени</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>,
      document.getElementById('user')
  )
};

export default ModalProfile;

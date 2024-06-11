import ReactDOM from 'react-dom'
import Close from '../../img/close.png'
import { useEffect, useState } from 'react'
import  axios  from 'axios'
import { fixMinutes } from '../services/TimeService'

const ModalJoinVideo = ({open,onClose,consId}) => {

    const [consData,setConsData] = useState({})
    const [time,setTime ] = useState('')
    const [date,setDate] = useState('')
    const [createdTime,setCreatedTime] = useState('')
    const [createdDate,setCreatedDate] = useState('')
    const [btnDisabled,setBtnDisabled] = useState(true)
    const [problem,setProblem] = useState('')

    useEffect(()=>{
        if(consId){
          axios.get(`https://localhost:7176/api/Consultation/consultation/${consId}`)
              .then(response=>{
                  console.log(response.data)
                  setConsData(response.data)
  
                  const datetime = new Date(response.data.consultationStart)
                  const hour = datetime.getHours()
                  var minutes = datetime.getMinutes()
                  const day = datetime.getDate()
                  const month = datetime.getMonth() + 1
                  const year = datetime.getFullYear()
  
                  minutes = fixMinutes(minutes)
                  setTime(`${hour}:${minutes}`)
                  setDate(`${day}/${month}/${year}`)
                  setProblem(response.data.des)

                  const createdDateTime = new Date(response.data.created)
                  const createdHour = createdDateTime.getHours()
                  var createdMinutes = createdDateTime.getMinutes()
                  const createdDay = createdDateTime.getDate()
                  const createdMonth = createdDateTime.getMonth() + 1
                  const createdYear = createdDateTime.getFullYear()
  
                  createdMinutes = fixMinutes(createdMinutes)
                  setCreatedTime(`${createdHour}:${createdMinutes}`)
                  setCreatedDate(`${createdDay}/${createdMonth}/${createdYear}`)
                })
              .catch(err=>console.error(err))
            }
      },[consId])

  return ReactDOM.createPortal (
    <>
      {open && (
        <div className='overlay'>
          <div className='modal-container'>
            <div className='modal-container-header'>
              <h5 className='modal-header'>Започната консултација</h5>
              <img onClick={onClose} src={Close} height={30} width={30} className='close-button' alt='close-button' />
            </div>
            <div className='modal-main'>
                {consData && <div>
                <p>Милениче: {consData.pet_Name}</p>
                <p>Закажан за: {date} <strong>{time}</strong></p>
                <p>Закажан на: {createdDate} <strong>{createdTime}</strong></p>
                <p>{problem}</p>
                <div className='btnstart-sep'>
                <hr />
                <button className='btn btn-success startvideo-btn' >Приклучи се</button>
                
              
                </div>
            </div>}
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('join-video')
  )
}

export default ModalJoinVideo

import { useEffect, useState } from 'react'
import Arrow from '../../img/arrow.png'
import axios from 'axios'
import { useName } from '../../components/contexts/NameContext'
import { Outlet, Route, useNavigate } from 'react-router-dom'


const Emergency = () => {
  const [pets,setPets] = useState([])
  const [vets,setVets] = useState([])

  const {id} = useName()

  const navigate = useNavigate()

  const [dateVideo,setDateVideo] = useState({
    year:null,
    month:null,
    day:null
  })

  const [chosenTime,setChosenTime] = useState({
    hour:null,
    minutes:null
  })

  const dateTime = new Date(
    dateVideo.year,
    dateVideo.month,
    dateVideo.day,
    chosenTime.hour,
    chosenTime.minutes
  )

  useEffect(()=>{
    axios.get('https://localhost:7176/api/Pet')
      .then(response=>{
        console.log(response.data.map(pet=>pet.owner_Id))
        setPets(response.data.filter(pet=>pet.owner_Id===id))
        
      })
      .catch(error=>{
        console.error(error)
      })
  },[])

  useEffect(()=>{
    const current = new Date()
      axios.get('https://localhost:7176/api/Appointment')
          .then(response=>{
            console.log(response.data)
            const yetToComeAps = response.data.filter(aps=>{
              const date = new Date(aps.dateTime)
              return date>current;
            })

            setApData(yetToComeAps)

            const passedAps = response.data.filter(aps=>{
              const date = new Date(aps.dateTime)

              return date<current
            })
            setPassedApData(passedAps)

          })
          .catch(error=>console.error(error))

        axios.get(`https://localhost:7176/api/Auth/get-vets`)
          .then(response=>{
            setVets(response.data)
            console.log(response.data)
          })
          .catch(error=>console.error(error))
          
  },[])  




  return (
      <div className='consultation-main'>
        <div className='video-form'> 
        <form >
          <h5>Закажување на онлајн видео преглед</h5>
          <select className='form-control' name="Одбери" id="">
            <option value={'default'}>Одбери милениче</option>
            {pets && pets.map(pet=>{
              return (<option value={pet.id}>{pet.name}</option>)
            })}
          </select>
          <div className='horizontal gap-3'>
            <input type='date' className='form-control'/>
            <select id="" className="form-control">
              <option>Time time</option>
            </select>
          </div>
          <select  id="" className="form-control choosevet">
            <option>Префериран ветеринар</option>
            {vets && vets.map(vet=>(
              <option>{vet.displayName}</option>
            ))}
          </select>
          <small>*Овој ветеринар ќе ја одржи консултацијата доколку е во можност.</small>
          <textarea placeholder='Краток опис на проблемот' className='form-control textarea-problem'></textarea>
        </form>
        </div>
      </div>
  )
}

export default Emergency

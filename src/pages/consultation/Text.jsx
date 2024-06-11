import { useEffect, useState } from 'react'
import axios from 'axios'
import { useName } from '../../components/contexts/NameContext'
import ModalPay from '../../components/modals/ModalPay'
import {toast} from 'react-toastify'
import { Outlet } from 'react-router-dom'
import ModalPayVideo from '../../components/modals/ModalPayVideo'

const Text = () => {
  const [payModal,setPayModal] = useState(false)

  const [pets,setPets] = useState([])
  const [vets,setVets] = useState([])

  const {id} = useName()

  const [selectedPetId,setSelectedPetId] = useState('')
  const [selectedVetId,setSelectedVetId] = useState('')
  const [problemDes,setProblemDes] = useState('')
  const current = new Date()

  useEffect(()=>{
    axios.get('https://localhost:7176/api/Pet')
      .then(response=>{
        console.log(response.data.map(pet=>pet.owner_Id))
        setPets(response.data.filter(pet=>pet.owner_Id===id))
        
      })
      .catch(error=>{
        console.error(error)
      })

      axios.get(`https://localhost:7176/api/Auth/get-vets`)
          .then(response=>{
            setVets(response.data)
            console.log(response.data)
          })
          .catch(error=>console.error(error))
  },[])



  const handleSubmit = (e) =>{
    e.preventDefault()
 
    const mydate = new Date(current)
    const day = mydate.getDate()
    const month = mydate.getMonth() +1
    const year = mydate.getFullYear()

    axios.get(`https://localhost:7176/api/Consultation/validate-consultation?userId=${id}&date=${month}%2F${day}%2F${year}&typeId=1`)
      .then(response=>{
          var valid = response.data === true
          console.log("IsValid ",valid)
          if(!valid){
            toast.error("Можете да започнете нова консултација кога ќе ја завршите сегашната.")
            return
          }
          else{
            if(selectedPetId && selectedVetId && problemDes && current){
              setPayModal(true)
            }
          }
            
            })
      .catch(error=>{
        console.error(error)
      })

    
  }
  return (
      <div className='consultation-main temp'>
        <ModalPayVideo open={payModal} onClose={()=>setPayModal(false)} price={300} vet={selectedVetId} 
          pet={selectedPetId} type={1} created={current.toISOString()} problemDes={problemDes} mydate={current}/>
        <div className='text-form'>
        <div className="text-form-content">
          <form onSubmit={e=>{
            handleSubmit(e)
          }}>
            <h5>Започнување на консултација</h5>
            <select className='form-control' name="Одбери" id="" defaultValue={'default'} onChange={(e)=>setSelectedPetId(e.target.value)}>
              <option key={0} value={'default'}>Одбери милениче</option>
              {pets && pets.map(pet=>{
                return (<option key={pet.id} value={pet.id}>{pet.name}</option>)
              })}
            </select>
            
            <select id="" defaultValue={'default'} className="form-control choosevet" onChange={(e)=>setSelectedVetId(e.target.value)}>
              <option key={0} value={'default'}>Префериран ветеринар</option>
              {vets && vets.map(vet=>(
                <option key={vet.id} value={vet.id}>{vet.displayName}</option>
              ))}
            </select>
            <small>*Овој ветеринар ќе ја одржи консултацијата доколку е во можност.</small>
            <textarea placeholder='Краток опис на проблемот' className='form-control textarea-problem' 
            onChange={(e)=>setProblemDes(e.target.value)}></textarea>
            <button className='btn btn-success mt-3' type='submit' disabled={!selectedPetId || !selectedVetId || !problemDes || problemDes.length<15} >Продожи кон плаќање</button>
          </form>
        </div>
        </div>
        <div className='text-sidebar-right'>
          a
        </div>
        </div>
      
  
  )
}

export default Text

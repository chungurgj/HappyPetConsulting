import  ReactDOM  from "react-dom"
import Close from '../../img/close.png'
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useName } from "../contexts/NameContext"
import axios from "axios"
import ModalAddPet from "./ModalAddPet"
import Delete from '../../img/delete.png'


const ModalPet = ({open,onClose}) => {
    const {id} = useName()
    const [petData,setPetData] = useState({})
    const [isOpen,setIsOpen] = useState(false)

  useEffect(()=>{
    axios.get(`https://localhost:7176/api/Pet`)
      .then(response=>{
        console.log(response.data.filter(pet=>pet.owner_Id===id))
        setPetData(response.data.filter(pet=>pet.owner_Id===id))
      })
      .catch(error=>{
        console.error(error)
      })
  },[open])

  useEffect(()=>{
      if(open)
        document.body.style.overflowY ='hidden'
      else
        document.body.style.overflowY = 'scroll'
    },[open])
      
    useEffect(()=>{
      if(isOpen==true)
        onClose()
    },[isOpen])
   
const removePet = (index) =>{
  axios.delete(`https://localhost:7185/api/pet?petId=${index}`)
    .then(response=>{
      console.log(response)
      toast.success("Успешно избришано милениче")

      axios.get(`https://localhost:7185/api/pet/${id}`)
      .then(response=>{
        console.log(response)
        setPetData(response.data)
      })
      .catch(error=>{
        console.error(error)
      })
    })
    .catch(error=>{
      console.error(error)
      toast.error("Неуспешно избришано милениче")
      
    })
}
  return ReactDOM.createPortal(
    <>
      <ModalAddPet open={isOpen} onClose={()=>setIsOpen(false)} ></ModalAddPet>
        {open &&
            <div className="overlay">
            <div className="modal-container">
                <div className="modal-container-header">
                    <h5 className="modal-header" >Милениче</h5> 
                    <img src={Close} height={30} width={30} className="close-button" onClick={onClose}/>  
                </div>
                <div className="modal-main">
                <div className="pet-info-container">
                    {petData.map(index=>(
                      <div className="pet-info">   
                      <div className="pet-info-pets">
                        <p className="pet-name infopet">{index.name}</p>
                        <p className="pet-breed infopet">{index.breed}</p>
                        <p className="pet-animal infopet">{index.animal}</p>
                        
                      </div>
                      
                      <button className="btn btn-danger otstrani" onClick={()=>removePet(index.id)}>
                        <img src={Delete} height={15}/>
                      </button>
                      </div>
                    ))}
                    </div>
                    <button className="btn btn-success" onClick={()=>setIsOpen(true)}>Додај милениче</button>
                </div>
            </div>
        </div> 
        }
        
    </>,
    document.getElementById('pet')
  )
}

export default ModalPet

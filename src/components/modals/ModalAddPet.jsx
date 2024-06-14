import ReactDOM from "react-dom";
import Close from '../../img/close.png';
import '../style.css';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useName } from "../contexts/NameContext";
import { usePet } from "../contexts/PetContext";
const ModalAddPet = ({ open, onClose,noclose }) => {
  if (open)
    document.body.style.overflow = 'hidden';
  else
    document.body.style.overflow = 'scroll';

  const {id} = useName()
  const {petDataSaved,addPetData} = usePet()
  const [petData, setPetData] = useState([{
    petName:'',
    petBreed:'',
    petAnimal:'',
    petAge:0,
    medHistory:'',
    color:'',
  }]);
    const [disable,setDisable] = useState(true)

    useEffect(()=>{
            if(petData.petName && petData.petBreed && petData.petAnimal && petData.petAge ){
                setDisable(false)
            }
            else{
                setDisable(true)
            }
        
    },[petData])

    // {
    //   "name": "string",
    //   "animal": "string",
    //   "breed": "string",
    //   "age": 0,
    //   "medHistory": "string",
    //   "color": "string",
    //   "owner_Id": "string"
    // }

    const addForm = () =>{
        axios.post('https://localhost:7176/api/Pet',{
            name: petData.petName,
            animal: petData.petAnimal,
            breed: petData.petBreed,
            age: petData.petAge,
            medHistory: petData.medHistory,
            color:petData.color,
            owner_Id: id
        })
        .then(response=>{
            console.log(response)
            toast.success("Успешно внесено милениче")
      
            setPetData({
              petName:'',
              petAge: '',
              petBreed:'',
              petAnimal:''
            })
            setDisable(true);
            
        })
        .catch(error=>{
            console.error(error)
            toast.error("Серверски проблем")
        })
    }

    const handleColor = (e) =>{
      if(e.target.value!=''){
        
        setPetData({...petData,color:e.target.value})
        setDisable(false)
      }
      else{
        setDisable(true)
      }
    }

    const handleName = (e) =>{
        const nonLetter = /[^a-zA-Z]/.test(e.target.value)
        if(nonLetter){
            toast.error("Внесете валидно име")
            setDisable(true)
        }
        else{
            setPetData({...petData,petName: e.target.value})
            setDisable(false)
        }
    }
    const handleBreed = (e) =>{
        const nonLetter = /[^a-zA-Z]/.test(e.target.value)
        if(nonLetter){
            toast.error("Внесете валидна раса")
            setDisable(true)
        }
        else{
            setPetData({...petData,petBreed: e.target.value})
            setDisable(false)
        }
        
    }
    const handleAnimal = (e) =>{
        const nonLetter = /[^a-zA-Z]/.test(e.target.value)
        if(nonLetter ){
            toast.error("Внесете валидно животно")
            setDisable(true)
        }
        else{
            setPetData({...petData,petAnimal: e.target.value})
            setDisable(false)
        }
       
    }
    const handleAge = (e) =>{
        
        if(e.target.value>=0 && e.target.value<25){
            setPetData({...petData,petAge: e.target.value})
        }
        else{
            toast.error("Внесете валидна старост")
            setDisable(true)
        }
        
    }
    
  return ReactDOM.createPortal(
    <>
      {open &&
        <div className="overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h5>Внеси милениче</h5>
              {noclose === true ? <></> : <img onClick={onClose} src={Close} height={30} width={30} className='close-button' alt='close-button' />}
            </div>
            <div className="modal-main">
              <form className="form-container">    
                  <div className="input-group mb-3 gap-3">
                    <input type="name" className="form-control form-control-lg bg-light fs-6 cisti" onChange={(e) => handleName(e)} placeholder="Име" value={petData.petName}/>
                    <input type="name" className="form-control form-control-lg bg-light fs-6" onChange={(e) => handleAnimal(e)} placeholder="Животно"  value={petData.petAnimal}/>
                  </div>
                  <div className="input-group mb-3 gap-3">
                    <input type="name" className="form-control form-control-lg bg-light fs-6" onChange={(e) => handleBreed(e)} placeholder="Раса"  value={petData.petBreed}/>
                    <input type="number" className="form-control form-control-lg bg-light fs-6" onChange={(e) => handleAge(e)} placeholder="Старост"  value={petData.petAge}/>
                  </div>
                  <input type="string" className="form-control form-control-lg bg-light fs-6" placeholder="Внеси боја" onChange={(e)=>handleColor(e)}  value={petData.color}/>
              </form>
                <button className="btn btn-success addPet-button"  disabled={disable} onClick={addForm}>Додади милениче</button>
              
              { noclose === true ? <small>*За да продолжите понатаму мора да внесете милениче.</small> : <></>}
             
            </div>
          </div>
        </div>
      }
    </>,
    document.getElementById('addPet')
  );
}

export default ModalAddPet;

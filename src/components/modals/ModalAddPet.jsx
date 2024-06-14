import ReactDOM from "react-dom";
import Close from '../../img/close.png';
import '../style.css';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useName } from "../contexts/NameContext";
import { usePet } from "../contexts/PetContext";

const ModalAddPet = ({ open, onClose, noclose }) => {
  if (open)
    document.body.style.overflow = 'hidden';
  else
    document.body.style.overflow = 'scroll';

  const { id } = useName();
  const [petData, setPetData] = useState({
    petName: '',
    petBreed: '',
    petAnimal: '',
    petAge: '',
    medHistory: '',
    color: '',
  });
  const [disable, setDisable] = useState(true);

  const validateData = () => {
    const isValid =
      petData.petName.trim() !== '' &&
      !/[^a-zA-Z]/.test(petData.petName) &&
      petData.petAnimal.trim() !== '' &&
      !/[^a-zA-Z]/.test(petData.petAnimal) &&
      petData.petBreed.trim() !== '' &&
      !/[^a-zA-Z]/.test(petData.petBreed) &&
      petData.petAge >= 0 && petData.petAge < 25 &&
      petData.color.trim() !== '';

    setDisable(!isValid);
  };

  useEffect(() => {
    validateData();
  }, [petData]);

  const addForm = () => {
    axios.post('https://localhost:7176/api/Pet', {
      name: petData.petName,
      animal: petData.petAnimal,
      breed: petData.petBreed,
      age: petData.petAge,
      medHistory: petData.medHistory,
      color: petData.color,
      owner_Id: id
    })
      .then(response => {
        console.log(response);
        toast.success("Успешно внесено милениче");
        
        setPetData({
          petName: '',
          petBreed: '',
          petAnimal: '',
          petAge: '',
          medHistory: '',
          color: '',
        })

        onClose()
      })
      .catch(error => {
        console.error(error);
        toast.error("Серверски проблем");
      });
  };

  const handleInputChange = (field, value) => {
    setPetData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleName = (e) => {
    const value = e.target.value;
    if (/[^a-zA-Z]/.test(value)) {
      toast.error("Внесете валидно име");
    } else {
      handleInputChange('petName', value);
    }
  };

  const handleBreed = (e) => {
    const value = e.target.value;
    if (/[^a-zA-Z]/.test(value)) {
      toast.error("Внесете валидна раса");
    } else {
      handleInputChange('petBreed', value);
    }
  };

  const handleAnimal = (e) => {
    const value = e.target.value;
    if (/[^a-zA-Z]/.test(value)) {
      toast.error("Внесете валидно животно");
    } else {
      handleInputChange('petAnimal', value);
    }
  };

  const handleAge = (e) => {
    const value = e.target.value;
    if (value >= 0 && value < 25) {
      handleInputChange('petAge', value);
    } else {
      toast.error("Внесете валидна старост");
    }
  };

  const handleColor = (e) => {
    const value = e.target.value;
    handleInputChange('color', value);
  };

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
                  <input type="name" className="form-control form-control-lg bg-light fs-6 cisti" onChange={handleName} placeholder="Име" value={petData.petName} />
                  <input type="name" className="form-control form-control-lg bg-light fs-6" onChange={handleAnimal} placeholder="Животно" value={petData.petAnimal} />
                </div>
                <div className="input-group mb-3 gap-3">
                  <input type="name" className="form-control form-control-lg bg-light fs-6" onChange={handleBreed} placeholder="Раса" value={petData.petBreed} />
                  <input type="number" className="form-control form-control-lg bg-light fs-6" onChange={handleAge} placeholder="Старост" value={petData.petAge} />
                </div>
                <input type="string" className="form-control form-control-lg bg-light fs-6" placeholder="Внеси боја" onChange={handleColor} value={petData.color} />
              </form>
              <button className="btn btn-success addPet-button" disabled={disable} onClick={addForm}>Додади милениче</button>

              {noclose === true ? <small>*За да продолжите понатаму мора да внесете милениче.</small> : <></>}

            </div>
          </div>
        </div>
      }
    </>,
    document.getElementById('addPet')
  );
}

export default ModalAddPet;

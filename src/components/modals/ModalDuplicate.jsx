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
  const { petDataSaved, addPetData } = usePet();
  const [petData, setPetData] = useState({
    petName: '',
    petBreed: '',
    petAnimal: '',
    petAge: 0,
    medHistory: '',
    color: '',
  });
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    // Check if all input fields are filled and contain valid data
    const isValid =
      petData.petName.trim() !== '' &&
      !/[^a-zA-Z]/.test(petData.petName) &&
      petData.petAnimal.trim() !== '' &&
      !/[^a-zA-Z]/.test(petData.petAnimal) &&
      petData.petBreed.trim() !== '' &&
      !/[^a-zA-Z]/.test(petData.petBreed) &&
      petData.petAge >= 0 && petData.petAge < 25 &&
      petData.color.trim() !== '';

    setDisable(!isValid); // Disable button if any input is invalid or empty
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
          petAge: '',
          petBreed: '',
          petAnimal: ''
        });
      })
      .catch(error => {
        console.error(error);
        toast.error("Серверски проблем");
      });
  };

  const handleColor = (e) => {
    if (e.target.value !== '') {
      setPetData({ ...petData, color: e.target.value });
    }
  };

  const handleName = (e) => {
    const nonLetter = /[^a-zA-Z]/.test(e.target.value);
  

    if (!nonLetter) {
      setPetData({ ...petData, petName: e.target.value });
    } else {
      setPetData({ ...petData, petName: '' });
    }
  };

  const handleBreed = (e) => {
    const nonLetter = /[^a-zA-Z]/.test(e.target.value);
    if (nonLetter) {
      toast.error("Внесете валидна раса");
    } else {
      setPetData({ ...petData, petBreed: e.target.value });
    }
  };

  const handleAnimal = (e) => {
    const nonLetter = /[^a-zA-Z]/.test(e.target.value);
    if (nonLetter) {
      toast.error("Внесете валидно животно");
    } else {
      setPetData({ ...petData, petAnimal: e.target.value });
    }
  };

  const handleAge = (e) => {
    if (e.target.value >= 0 && e.target.value < 25) {
      setPetData({ ...petData, petAge: e.target.value });
    } else {
      toast.error("Внесете валидна старост");
    }
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
                  <input type="name" className="form-control form-control-lg bg-light fs-6 cisti" onChange={(e) => handleName(e)} placeholder="Име" value={petData.petName} />
                  <input type="name" className="form-control form-control-lg bg-light fs-6" onChange={(e) => handleAnimal(e)} placeholder="Животно" value={petData.petAnimal} />
                </div>
                <div className="input-group mb-3 gap-3">
                  <input type="name" className="form-control form-control-lg bg-light fs-6" onChange={(e) => handleBreed(e)} placeholder="Раса" value={petData.petBreed} />
                  <input type="number" className="form-control form-control-lg bg-light fs-6" onChange={(e) => handleAge(e)} placeholder="Старост" value={petData.petAge} />
                </div>
                <input type="string" className="form-control form-control-lg bg-light fs-6" placeholder="Внеси боја" onChange={(e) => handleColor(e)} value={petData.color} />
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

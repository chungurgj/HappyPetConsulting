import { useEffect, useState } from 'react';
import Arrow from '../../img/arrow.png';
import axios from 'axios';
import { useName } from '../../components/contexts/NameContext';
import { useNavigate } from 'react-router-dom';
import DateTimeSidebar from '../../components/user/DateTimeSidebar';
import { toast } from 'react-toastify';
import ModalPayVideo from '../../components/modals/ModalPayVideo';
import { usePet } from '../../components/contexts/PetContext';
import ModalAddPet from '../../components/modals/ModalAddPet';

const Video = () => {
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([]);

  const [dateTime, setDateTime] = useState(null);
  const [selectedPet, setSelectedPet] = useState('');
  const [selectedVet, setSelectedVet] = useState('');
  const [problemDes, setProblemDes] = useState('');

  const [openModalPay, setOpenModalPay] = useState(false);
  const [openModalAddPet, setOpenModalAddPet] = useState(false);

  const { id } = useName();
  const navigate = useNavigate();
  const { loggedIn, roles } = useName();
  const { hasPet } = usePet();

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get(`https://localhost:7176/api/Pet/by-owner/${id}`)
      .then(response => {
        console.log(response.data.map(pet => pet.owner_Id));
        setPets(response.data.filter(pet => pet.owner_Id === id));
      })
      .catch(error => {
        console.error(error);
      });

    axios.get(`https://localhost:7176/api/Auth/get-vets`)
      .then(response => {
        setVets(response.data);
        console.log(response.data);
      })
      .catch(error => console.error(error));
  }, [id]);

  useEffect(() => {
    if (refresh) {
      setSelectedPet('');
      setSelectedVet('');
      setProblemDes('');
      setDateTime(null);
      setRefresh(false);
    }
  }, [refresh]);

  const handleSelectPet = (value) => {
    setSelectedPet(value);
  };

  const handleSelectVet = (value) => {
    setSelectedVet(value);
  };

  const handleProblemDes = (value) => {
    setProblemDes(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mydate = new Date();
    const month = mydate.getMonth() + 1; // JavaScript months are zero-based
    const day = mydate.getDate();
    const year = mydate.getFullYear();

    axios.get(`https://localhost:7176/api/Consultation/validate-consultation?userId=${id}&date=${month}%2F${day}%2F${year}&typeId=2`)
      .then(response => {
        const valid = response.data === true;
        console.log("IsValid ", valid);
        if (!valid) {
          toast.error("Можете да започнете нова консултација кога ќе ја завршите сегашната.");
        } else {
          setOpenModalPay(true);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (loggedIn && !hasPet && roles === 'User') {
      setOpenModalAddPet(true);
    } else {
      setOpenModalAddPet(false);
    }
  }, [hasPet, loggedIn, roles]);

  return (
    <div className='consultation-main'>
      <ModalPayVideo open={openModalPay} onClose={() => setOpenModalPay(false)} type={2} pet={selectedPet} 
      vet={selectedVet} problemDes={problemDes} date={dateTime} price={600} refreshData={setRefresh} />
      <ModalAddPet open={openModalAddPet} noclose={true} onClose={() => setOpenModalAddPet(false)} />
      <div className='video-form'> 
        <form className='form-padding' onSubmit={handleSubmit}>
          <h5>Закажување на онлајн видео преглед</h5>
          <select className='form-control' name="Одбери" id='' value={selectedPet} defaultValue={'default'} onChange={(e) => handleSelectPet(e.target.value)}>
            <option value={'default'}>Одбери милениче</option>
            {pets && pets.map(pet => (
              <option key={pet.id} value={pet.id}>{pet.name}</option>
            ))}
          </select>
          <select id="" className="form-control choosevet" defaultValue={'default'} onChange={(e) => handleSelectVet(e.target.value)}>
            <option value={'default'}>Префериран ветеринар</option>
            {vets && vets.map(vet => (
              <option key={vet.id} value={vet.id}>{vet.displayName}</option>
            ))}
          </select>
          <small>*Овој ветеринар ќе ја одржи консултацијата доколку е во можност.</small>
          <textarea placeholder='Краток опис на проблемот' className='form-control textarea-problem' value={problemDes} onChange={(e) => handleProblemDes(e.target.value)}></textarea>
          <button type='submit' className="btn btn-success mt-4 zakazibtn" disabled={!selectedPet || !selectedVet || problemDes.length < 10 || !dateTime}>Закажи</button>
        </form>
      </div>
      <DateTimeSidebar dateandtime={setDateTime} marg={0} refreshA={refresh} type={'appointment'} />
    </div>
  );
};

export default Video;

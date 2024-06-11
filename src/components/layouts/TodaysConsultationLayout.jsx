import { useEffect, useState } from 'react'
import axios from 'axios'
import { Outlet} from 'react-router-dom'
import { useName } from '../contexts/NameContext'
import ModalStartVideo from '../modals/ModalStartVideo'
import VetLeftSideComp from '../vet/VetLeftSideComp'
import ModalLoading from '../modals/ModalLoading'

const TodaysConsultationLayout = () => {
  const [textAps, setTextAps] = useState([]);
  const [videoAps, setVideoAps] = useState([]);
  const [urgentAps, setUrgentAps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [modalStartOpen, setModalStartOpen] = useState(false);
  const [nowDate, setNowDate] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState('');
  const [error, setError] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const fetchConsultations = async () => {
    setLoadingData(true); // Set loadingData to true before making API calls

    const requests = [
      axios.get(`https://localhost:7176/api/Consultation/video?done=false`),
      axios.get(`https://localhost:7176/api/Consultation/text?done=false`),
      axios.get(`https://localhost:7176/api/Consultation/emergency?&done=false`)
    ];

    try {
      const [videoResponse, textResponse, urgentResponse] = await Promise.all(requests);
      
      setVideoAps(videoResponse.data.sort((a, b) => new Date(a.consultationStart) - new Date(b.consultationStart)));
      setTextAps(textResponse.data.sort((a, b) => new Date(a.consultationStart) - new Date(b.consultationStart)));
      setUrgentAps(urgentResponse.data.sort((a, b) => new Date(a.consultationStart) - new Date(b.consultationStart)));
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoadingData(false); // Set loadingData to false after all API calls complete
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, [refresh]);

  useEffect(() => {
    if (error !== true) {
      setLoading(false);
    }
  }, [error]);

  return (
    <div className='consultation-container '>
      <ModalLoading open={loading || loadingData}/> 
      {/* <ModalStartVideo open={modalStartOpen} onClose={() => setModalStartOpen(false)} selectedVideo={selectedConsultation} newDate={nowDate} /> */}
      <div className='consultation-sidebar'>
        <div className='sidebar-padding'>
          <VetLeftSideComp apsArr={textAps} type={1} />
          <VetLeftSideComp apsArr={videoAps} type={2} />
          <VetLeftSideComp apsArr={urgentAps} type={3} />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default TodaysConsultationLayout;

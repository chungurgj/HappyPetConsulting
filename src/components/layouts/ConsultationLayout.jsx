import { useEffect, useState } from 'react'
import axios from 'axios'
import { Outlet, useOutlet} from 'react-router-dom'
import { useName } from '../contexts/NameContext'
import ModalStartVideo from '../modals/ModalStartVideo'
import UserLeftSideComp from '../user/UserLeftSideComp'
import ModalLoading from '../modals/ModalLoading'
import '../style.css'
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
const ConsultationLayout = () => {
  const [textAps, setTextAps] = useState([]);
  const [videoAps, setVideoAps] = useState([]);
  const [urgentAps, setUrgentAps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useName();

  const [error, setError] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [refresh, setRefresh] = useState(false);
  
  const fetchConsultations = async () => {
    setLoadingData(true); // Set loadingData to true before making API calls

    const requests = [
      axios.get(`https://localhost:7176/api/Consultation/video?id=${id}&done=false`),
      axios.get(`https://localhost:7176/api/Consultation/text?id=${id}&done=false`),
      axios.get(`https://localhost:7176/api/Consultation/emergency?${id}=2&done=false`)
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
      <ModalLoading open={loading || loadingData}/> {/* Show loading indicator if loading or loadingData is true */}
      {/* <ModalStartVideo open={modalStartOpen} onClose={() => setModalStartOpen(false)} selectedVideo={selectedConsultation} newDate={nowDate} /> */}
      <div className='consultation-sidebar temp'>
        <div className='sidebar-padding'>
          <UserLeftSideComp apsArr={textAps} type={1} />
          <UserLeftSideComp apsArr={videoAps} type={2} />
          <UserLeftSideComp apsArr={urgentAps} type={3} />
        </div>
      </div>
    
      <Outlet context={[refresh,setRefresh,textAps]}/>
    </div>
  );
};

export default ConsultationLayout;

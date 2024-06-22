import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useName } from '../components/contexts/NameContext';
const TodayAllCons = ({refresh}) => {
  const [textAps, setTextAps] = useState([]);
  const [videoAps, setVideoAps] = useState([]);
  const [loadingData,setLoadingData] = useState(true)
  const {id} = useName()

  const fetchConsultations = async () => {
    setLoadingData(true); // Set loadingData to true before making API calls

    const requests = [
      axios.get(`https://localhost:7176/api/Consultation/video?id=${id}&done=false`),
      axios.get(`https://localhost:7176/api/Consultation/text?id=${id}&done=false`)
    ];

    try {
      const [videoResponse, textResponse] = await Promise.all(requests);
      setVideoAps(videoResponse.data.sort((a, b) => new Date(a.consultationStart) - new Date(b.consultationStart)));
      setTextAps(textResponse.data.sort((a, b) => new Date(a.consultationStart) - new Date(b.consultationStart)));
    
    } catch (error) {
      console.error(error);
      
    } finally {
      setLoadingData(false); 
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, [refresh]);

  useEffect(()=>{
    console.log(videoAps)
  },[videoAps])
  return (
    <div className='todaysContainer'>
      
      <div className="todaysComponent">
        <h5>Видео консултации</h5>
        <div className="apComponentContainer">
        {videoAps.length > 0 ? (
          videoAps.map(ap => (
          <div className='apComponent'>
            <p>{ap.pet_Name}</p>
        
            </div>
        ))
        
        ) : (
          <p>Loading...</p>
        )}
       
        </div>
      </div>
      <div className="todaysComponent">s</div>
      
    </div>
  )
}

export default TodayAllCons

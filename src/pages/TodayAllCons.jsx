import React from 'react'
import { useEffect, useState } from 'react'

const TodayAllCons = () => {
  // const [textAps, setTextAps] = useState([]);
  // const [videoAps, setVideoAps] = useState([]);
  // const [urgentAps, setUrgentAps] = useState([]);
  // const [loadingData,setLoadingData] = useState(true)
  
  // const fetchConsultations = async () => {
  //   setLoadingData(true); // Set loadingData to true before making API calls

  //   const requests = [
  //     axios.get(`https://localhost:7176/api/Consultation/video?id=${id}&done=false`),
  //     axios.get(`https://localhost:7176/api/Consultation/text?id=${id}&done=false`),
  //     axios.get(`https://localhost:7176/api/Consultation/emergency?${id}=2&done=false`)
  //   ];

  //   try {
  //     const [videoResponse, textResponse, urgentResponse] = await Promise.all(requests);
      
  //     setVideoAps(videoResponse.data.sort((a, b) => new Date(a.consultationStart) - new Date(b.consultationStart)));
  //     setTextAps(textResponse.data.sort((a, b) => new Date(a.consultationStart) - new Date(b.consultationStart)));
  //     setUrgentAps(urgentResponse.data.sort((a, b) => new Date(a.consultationStart) - new Date(b.consultationStart)));
  //   } catch (error) {
  //     console.error(error);
  //     setError(true);
  //   } finally {
  //     setLoadingData(false); // Set loadingData to false after all API calls complete
  //   }
  // };

  // useEffect(() => {
  //   fetchConsultations();
  // }, [refresh]);


  return (
    <div className='consultation-main'>
      <div className="consultation-chat position">
        <h3>Нема закажани консултации во текот на денешниот ден!</h3>
       
      </div>
    </div>
  )
}

export default TodayAllCons

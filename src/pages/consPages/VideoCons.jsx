import React, { useEffect, useRef, useState } from 'react';
import ConsRightSidebar from '../../components/user/ConsRightSidebar';
import VideoChat from '../../components/chat/VideoChat'; // Update the import path
import { Peer } from "peerjs";

const VideoCons = () => {
  const [stream, setStream] = useState(null);
  const [videoEn, setVideoEn] = useState(true);
  const [audioEn, setAudioEn] = useState(false);
  const [peer,setPeer] = useState(null)

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: videoEn, audio: audioEn });
        setStream(stream);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    getCameraStream();

    const initializePeer = () =>{
      const peer = new Peer()
      setPeer(peer)

      peer.on('open', id =>{
        console.log('PeerJS connection open, ID:',id)
      })
      peer.on('error',error=>{
        console.error('PeerJS connection error:',error)
      })
    }
    initializePeer()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if(peer)
        peer.destroy()
    };
  }, [videoEn, audioEn]); // Add videoEn and audioEn as dependencies

  return (
    <div className='consultation-main'>
    <div className='consultation-videochat'>
      <VideoChat stream={stream} videoEnabled={videoEn} audioEnabled={audioEn}/>
    </div>
    <ConsRightSidebar />
    
  </div>
   
  );
};

export default VideoCons;

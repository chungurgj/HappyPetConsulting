import React, { useEffect, useRef, useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Mic from '../../img/mic.png'
import Cam from '../../img/cam.png'

const VideoChat = ({ stream, videoEnabled, audioEnabled }) => {
  const videoRef = useRef(null);
  const hubConnection = useRef(null);
  const [camEnabled, setCamEnabled] = useState(true)
  const [micEnabled, setMicEnabled] = useState(false)

  useEffect(() => {
    const initializeSignalR = async () => {
      hubConnection.current = new HubConnectionBuilder()
        .withUrl('https://localhost:7138/videochat')
        .configureLogging(LogLevel.Information)
        .build();

      hubConnection.current.start().catch((err) => console.error('ERR SIGNALR ', err));

      hubConnection.current.on('UserJoined', (username) => {
        console.log(`${username} joined the chat`);
      });

      hubConnection.current.on('UserLeft', (username) => {
        console.log(`${username} left the chat`);
      });
    };
    initializeSignalR();

    return () => {
      if (hubConnection.current) {
        hubConnection.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const toggleCam = () => {
    setCamEnabled(prevState => {
      videoEnabled(!prevState);
      return !prevState;
    });
  };
  
  const toggleMic = () => {
    setMicEnabled(prevState => {
      audioEnabled(!prevState);
      return !prevState;
    });
  };

  return (

    <div className='video-container'>
      <video ref={videoRef} autoPlay playsInline ></video>
      <div className="overvideo">
        <button className={`btn  ${micEnabled ? 'btn-light' : 'btn-danger'} `} onClick={() => toggleMic()}>
          <img src={Mic} height={21} width={21} alt="Mic Icon"/>
        </button>
        <button className={`btn  ${camEnabled ? 'btn-light' : 'btn-danger'} `} onClick={() => toggleCam()}>
          <img src={Cam} height={21} width={21} alt="Cam Icon"/>
        </button>
        <button className='btn btn-danger'>Напушти</button>
      </div>
    </div>

  );
};

export default VideoChat;

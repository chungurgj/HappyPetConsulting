import React, { useEffect } from 'react';
import { useChat } from '../components/contexts/ChatContext';
const Test = () => {
  const {connection} = useChat()

  useEffect(() => {
    console.log("au ", connection);
  }, [connection]);

  if (!connection) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  return (
    <div className='test-cont'>
      <div className='colu column1'></div>
      <div className='colu column2'></div>
      <div className='colu column3'></div>
      <button onClick={handleYes}></button>
    </div>
  );
};

export default Test;

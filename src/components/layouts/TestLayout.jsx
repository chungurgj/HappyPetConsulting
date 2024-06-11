import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const TestLayout = () => {
    const [clicked, setClicked] = useState(false);

    return (
        <div>
            <h1>OOOO BE</h1>
            <p>Clicked prop value: {clicked ? 'YES' : 'NO'}</p>
          
            <Outlet context={[clicked,setClicked]}/> 
        </div>
    );
};

export default TestLayout;
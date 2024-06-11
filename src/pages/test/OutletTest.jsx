import React from 'react';
import { useOutletContext } from 'react-router-dom';
const OutletTest = ({ onClick }) => {
    const [clicked,setClicked] = useOutletContext()

    return (
        <div className='testpage'>
         
            <button onClick={()=>setClicked(!clicked)}>CLICK</button>
        </div>
    );
};

export default OutletTest;
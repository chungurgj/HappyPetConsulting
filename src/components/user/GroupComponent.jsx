import React from 'react'

const GroupComponent = ({image,title,subtitle,r1,r2,r3}) => {
  return (
    <div className='group-container' >
        <div className='group-text' >
            <h1 className='impact'>{title}</h1>
            <p>{subtitle}</p>
            <ul>
                <li>{r1}</li>
                <li>{r2}</li>
                <li>{r3}</li>
            </ul>
            <button className='btn btn-success vetbtn group-btn'>Кликни тука</button>
        </div>
        <img src={image} height={350} width={350} className='group-img'/>
    </div>
  )
}

export default GroupComponent

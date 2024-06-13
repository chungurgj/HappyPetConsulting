import React from 'react'

const ConsNavComp = ({imgUrl,title,text}) => {
  return (
    <div className='consNavComp'>
        <div className='consGroup'>
            <img src={imgUrl} height={50} className='consNavCompImg'/>
            <h5>{title}</h5>
            
        </div>
        
     <div className='consGroup'>
        <small>{text}</small>
        <button className='btn btn-success btnConsNav'>Продолжи</button>
     </div>
      
    </div>
  )
}

export default ConsNavComp

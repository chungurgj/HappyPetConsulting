import React from 'react'
import { fixMinutes } from '../services/TimeService'

const VetRightSide = ({showDetails,details}) => {
  return (
    <div className="approve-sidebar">
          <div className="details-cont"> 
            {showDetails? <div className='owner-details'>
              <p className='main-bold'>Сопственик</p>
              <div className='owner-name-email'>  
                <p className='ow-name'>{details.ownerName ? details.ownerName : "/"}</p>
                <p className='ow-email'>{details.ownerEmail}</p>
              </div>
              <div className="pet-details">
                <p className="main-bold">Милениче</p>
                 
                  <div className="pet-name-breed ">
                    <div className="pn">
                      <p className='ow-name'>{details.petName}</p>
                      <p className='ow-name'>{details.petBreed}</p>
                    </div>
                    <p className='ow-name'>{details.petAge} години</p>
                 </div>
                
               
              </div>
              <div className="cons-details">
                <div className="title-category">
                  <p className="main-bold">Консултациja</p>
                  <p className={`ow-name cons-type ${details.type}`}>{details.type}</p>
                </div>
                <div className='grouper-details'>
                <div className="cons-type-time">
                  <small>Закажан во:</small>
                  <p>{details.createdDate ? details.createdDate.toLocaleDateString() : ''}  <strong>{details.createdHour}:{fixMinutes(details.createdMinutes)}</strong> </p>
                </div>
                <div className="cons-type-time start">
                  <small>Почеток во:</small>
                  <p>{details.date ? details.date.toLocaleDateString() : ''}  <strong>{details.hour}:{fixMinutes(details.minutes)}</strong> </p>
                </div>
                </div>
              </div>
            </div> : <></>}
          </div>
          <div className='description-container'>
            {showDetails ? <> <p className='main-bold'>Кратко објаснување</p>
            <div className='des-cont'>
              <p>{details.des}</p>
            </div></> : <></>}
            
            
          </div>
        </div>
  )
}

export default VetRightSide

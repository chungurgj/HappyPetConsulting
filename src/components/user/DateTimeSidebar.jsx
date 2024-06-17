import React, { useEffect, useState } from 'react';
import Info from '../../img/info.png';
import axios from 'axios';
import { fixMinutes } from '../services/TimeService';

const DateTmeSidebar = ({ dateandtime, refreshV, marg, refreshA, type }) => {
  const currentDate = new Date();
  const current = currentDate.toISOString().split('T')[0];
  const [visitSlots, setVisitSlots] = useState([]);
  const [appointmentSlots, setAppointmentSlots] = useState([]);
  const [sel, setSel] = useState('');
  const [dateVideo, setDateVideo] = useState({
    year: null,
    month: null,
    day: null,
  });

  useEffect(() => {
    if (dateVideo.year && dateVideo.month && dateVideo.day) {
      const day = new Date(dateVideo.year, dateVideo.month, dateVideo.day).getDay();
      if (day !== 0 && day !== 6) {
        axios
          .get(`https://localhost:7176/api/Slots/get-all-visit-slots?date=${dateVideo.month + 1}%2F${dateVideo.day}%2F${dateVideo.year}`)
          .then((response) => {
            console.log('visit slots ', response.data);
            setVisitSlots(response.data);
          })
          .catch((err) => console.error(err));
      }
    }
  }, [dateVideo, refreshV]);

  useEffect(() => {
    if (dateVideo.year && dateVideo.month && dateVideo.day) {
      const day = new Date(dateVideo.year, dateVideo.month, dateVideo.day).getDay();
      if (day !== 0 && day !== 6) {
        axios
          .get(`https://localhost:7176/api/Slots/get-all-cons-slots?date=${dateVideo.month + 1}%2F${dateVideo.day}%2F${dateVideo.year}`)
          .then((response) => {
            console.log('appointment slots ', response.data);
            setAppointmentSlots(response.data);
          })
          .catch((err) => console.error(err));
      }
    }
  }, [dateVideo, refreshA]);

  const handleDate = (e) => {
    const date = new Date(e.target.value);
    console.log('date date ', e.target.value);

    setDateVideo({
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    });
  };

  const handleSelectSlot = (id, e, hour, minutes) => {
    e.preventDefault();
    setSel(id);

    const dateTime = new Date(
      dateVideo.year,
      dateVideo.month,
      dateVideo.day,
      hour,
      minutes
    );

    // Convert to UTC
    const utcDateTime = new Date(dateTime.getTime() - dateTime.getTimezoneOffset() * 60000);
    dateandtime(utcDateTime);
  };

  useEffect(() => {
    const input = document.getElementById('dateinput');

    input.addEventListener('input', (e) => {
      const date = new Date(e.target.value);
      const day = date.getDay();

      if (day === 0 || day === 6) {
        e.target.setCustomValidity('Не можете да закажете преглед за викенд.');
        e.target.reportValidity();
        e.target.value = '';
        setVisitSlots([]);
        setAppointmentSlots([]);
      } else {
        e.target.setCustomValidity('');
      }
    });
  }, []);

  return (
    <div className='datetime-sidebar'>
      <div className={`datetime-sidebar-content ${marg ? 'marg' : ''}`}>
        <input type='date' id='dateinput' className='form-control' min={current} onChange={handleDate} />
        <div className='sidebar-time-slots'>
          {dateVideo.year && dateVideo.month && dateVideo.day ? (
            <div className='slot-cont-side'>
              {(type === 'appointment' ? appointmentSlots : visitSlots)?.map((slot, index) => {
                const date = new Date(slot.time);
                const hour = date.getHours();
                const minutes = date.getMinutes();

                return (
                  <p
                    key={index}
                    onClick={(e) => handleSelectSlot(slot.id, e, hour, minutes)}
                    className={`slot ${!slot.isAvailable ? 'notav' : ''} ${!slot.possible ? 'notpos' : ''} 
          ${sel === slot.id ? 'sel' : ''}`}
                  >
                    {hour}:{fixMinutes(minutes)}
                  </p>
                );
              })}
            </div>
          ) : (
            <div className='sep'>
              <img src={Info} height={25} width={25} />
              <p>За да се појават теримините треба да одберете датум!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateTmeSidebar;

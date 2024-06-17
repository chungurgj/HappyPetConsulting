import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/admin/AdminNavbar';
import axios from 'axios';

const Admin = () => {
  const [vets, setVets] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7176/api/Auth/get-vets')
      .then(response => {
        setVets(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const workingHours = Array.from({ length: 11 }, (_, i) => `${i + 8}:00`);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (vets.length > 0) {
      setUserData({
        labels: vets.map(vet => vet.displayName),
        datasets: [
          {
            label: "Users Gained",
            data: userData?.map((data) => data.userGain),
            backgroundColor: [
              "rgba(75,192,192,1)",
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0",
            ]
          },
        ],
      });
    }
  }, [vets]);

  return (
    <div className='admin-page'>
      <AdminNavbar />
      <div className='bar-container'>
      </div>
    </div>
  );
};

export default Admin;

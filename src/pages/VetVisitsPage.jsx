import React, { useEffect, useState} from 'react'
import VetNavbar from '../components/vet/VetNavbar'
import axios from 'axios'
import { format, parseISO } from 'date-fns';
import { Outlet } from 'react-router-dom';
import { useName } from '../components/contexts/NameContext';
import { toast } from 'react-toastify';
import ModalDisapprove from '../components/modals/ModalDisapprove';

const VetVisitsPage = () => {
    const [visits,setVisits] = useState([])
    const [pendingVisits,setPendingVisits] = useState([])
    const [openModal,setOpenModal] = useState(false)

    const [filterDate,setFilterDate] = useState({
      year:null,
      month:null,
      day:null
    })

    const {id} = useName()

    const [filterStatus,setFilterStatus] = useState('site')
    const [filterMonth,setFilterMonth] = useState(0)
    const [filterQuery,setFilterQuery] = useState('')
    const [check,setCheck] = useState(false)
    const [visit_Id,setVisit_Id] = useState('')

    const handleFilterDate = (e) =>{
      const date = new Date(e.target.value)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      
      setFilterDate({
        ...filterDate,
        year:year,
        month:month,
        day:day
      })

    }


    useEffect(()=>{
      console.log("filterDate ",filterQuery)
    },[filterQuery])

    const handleFilterStatus = (e) =>{
      setFilterStatus(e.target.value)
    }

    const handleFilterMonth = (e) =>{
      setFilterMonth(e.target.value)
    }

    const handleFilterQuery = (e) =>{
      setFilterQuery(e.target.value)
    }

    const handleApprove = (e,myid) =>{
      if(e.target.value==='default'){
        toast.error("Одбери одобрување на преглед")
        return
      }
      if(e.target.value==='false'){
        setOpenModal(true)
        setVisit_Id(myid)
        return
      }
      const isApproved = e.target.value === 'true'

      axios.put(`https://localhost:7176/api/VetVisit/update/vet-visit`,{
        id:myid,
        isApproved:isApproved ,
        vet_Id:id
      })
      .then(response=>{
        console.log(response.data)
        setCheck(true)
        toast.success("Прегледот е успешно одобрен")
      })
      .catch(error=>console.error(error))
    }

   


    useEffect(()=>{
      const current = new Date()
      let url = `https://localhost:7176/api/VetVisit?`
  
      if (filterDate.year && filterDate.month && filterDate.day) {
          url += `filterDate=${filterDate.month}%2F${filterDate.day}%2F${filterDate.year}&`
      }
  
      if (filterStatus) {
          url += `filterStatus=${filterStatus}&`
      }
  
      if (filterMonth) {
          url += `filterMonth=${filterMonth}&`
      }
  
      if (filterQuery) {
          url += `filterQuery=${filterQuery}&`
      }
  
      axios.get(url)
          .then(response=>{
              var approvedVetVisits = response.data.filter(visit=>visit.approved === true)
              setVisits(approvedVetVisits)
              var pendingVetVisits = response.data.filter(visit=>visit.approved===false)
              setPendingVisits(pendingVetVisits)

          })
          .catch(error=>console.error(error))

          setCheck(false)
  },[filterDate, filterStatus, filterMonth, filterQuery,check])

  
  
  return (
    <div className='vet-container'>
      <ModalDisapprove open={openModal} onClose={()=>setOpenModal(false)} vetVisitId={visit_Id} onSubmitReason={()=>setCheck(true)}/>
      <div className='vet-filterbar'>
        <input type='date' className='form-control ' onChange={(e)=>handleFilterDate(e)}/>
        <select defaultValue={'site'} className='form-control ' onChange={(e)=>handleFilterStatus(e)}>
          <option value={'site'}>Сите</option>
          <option value={'idni'}>Идни</option>
          <option value={'pominati'}>Поминати</option>
        </select>
        <select defaultValue={'default'} className='form-control ' onChange={(e)=>handleFilterMonth(e)}>
          <option value={0}>Одбери месец</option>
          <option value={1}>Јануари</option>
          <option value={2}>Февруари</option>
          <option value={3}>Март</option>
          <option value={4}>Април</option>
          <option value={5}>Мај</option>
          <option value={6}>Јуни</option>
          <option value={7}>Јули</option>
          <option value={8}>Август</option>
          <option value={9}>Септември</option>
          <option value={10}>Октомври</option>
          <option value={11}>Ноември</option>
          <option value={12}>Декември</option>
        </select>
        <input type="search" className='form-control' placeholder='Пребарај' onChange={(e)=>handleFilterQuery(e)}/>
      </div>
      <div className='vet-main'>
      <div className='vet-table'>
              <table className='table1'>
              <thead>
                <tr>
                  <th>Милениче</th>
                  <th>Сопственик</th>
                  <th>Време</th>
                  <th>Датум</th>
                  <th>Ветеринар</th>
                </tr>
              </thead>
              {visits && (<tbody>
                {visits.map(visit=>{
                const dateAndTime = new Date(visit.dateTimeStart) 
                const day = dateAndTime.getDate()
                const month = dateAndTime.getMonth()
                const year = dateAndTime.getFullYear()
                const hour = dateAndTime.getHours()
                const minutes = dateAndTime.getMinutes() === 0 ? '00' : dateAndTime.getMinutes()

                return (
                  <tr key={visit.id}>
                    <td >{visit.pet_Name}</td>
                    <td>{visit.owner_Name ? visit.owner_Name : 'Нема име'}</td>
                    <td>{month+1}/{day}/{year}</td>
                    <td>{hour}:{minutes}</td>
                    <td>{visit.vet_Name}</td>
                  </tr>
                )
              })}
              </tbody>)}
            </table>
        </div>
        <div className='vet-approval-container'>
          {/* <h5>Прегледи за одобрување</h5> */}
          <div className='pendingVisits-container'>
          <table className='table-approve'>
            <thead>
              <tr>
                <th>Милениче</th>
                <th>Сопственик</th>
                <th>Време</th>
                <th>Датум</th>
                <th>Одобри</th>
              </tr>
            </thead>
            {pendingVisits && (<tbody>
              { pendingVisits.map(visit=>{
              
              var date = new Date(visit.dateTimeStart)
              var hour = date.getHours()
              var minutes = date.getMinutes()
              var year = date.getMinutes()
              var month = date.getMonth()
              var day = date.getDate()

              return (<tr key={visit.id}>
                <td>{visit.pet_Name}</td>
                <td>{visit.owner_Name ? visit.owner_Name : '/'}</td>
                <td>{hour}:{minutes}</td>
                <td>{month}/{day}/{year}</td>
                <td>
                  <select defaultValue={'default'} onChange={(e)=>handleApprove(e,visit.id)}>
                    <option value={'default'}>Одбери</option>
                    <option value={'true'}>Одобри</option>
                    <option value={'false'}>Откажи</option>
                  </select>
                </td>
              </tr>)
            })}
            </tbody>)}
          </table>
          </div>
         
        </div>
      </div>
      
        <Outlet/>
      </div>
        
        
  )
}

export default VetVisitsPage

import React, { useEffect, useState } from 'react'
import axios from 'axios'
const MedicalEvidence = () => {
    const [petData,setPetData] = useState([])
    const [search,setSearch] = useState('')
    const [category,setCategory] = useState('site')
    const handleSearch = (e) =>{
        setSearch(e.target.value)
    }

    const handleCategory = (e) =>{
        setCategory(e.target.value)
    }

    useEffect(()=>{
        //https://localhost:7176/api/Pet/by-name?petName=re&petAnimal=kuce
        var url = `https://localhost:7176/api/Pet/by-name?`

        if(search){
            url+= `petName=${search}&`
        }
        if(category){
            url+=`petAnimal=${category}`
        }
        axios.get(url)
            .then(response=>{
                console.log(response.data)
                setPetData(response.data)
            })
            .catch(error=>{
                console.error(error)
            })
    },[search,category])

    useEffect(()=>{
        console.log("search ",search)
        console.log("cateo ", category)
    },[search,category])
  return (
    <div className='vet-container'>
        <div className='vet-filterbar med'>
        <select defaultValue={'site'} className='form-control med-search' onChange={(e)=>handleCategory(e)}>
            <option value={'site'}>Сите</option>
            <option value={'kuce'}>Куче</option>
            <option value={'macka'}>Мачка</option>
            <option value={'zajak'}>Зајак</option>
            <option value={'papagal'}>Папагал</option>
            <option value={'ostanato'}>Останато</option>
        </select>
        <input type="search" className='form-control med-search' placeholder='Пребарај' onChange={(e)=>handleSearch(e)}/>
      </div>
      <div className='med-main'>
        
        <table className='med-table'>
              <thead>
                <tr>
                  <th>Име</th>
                  <th>Вид</th>
                  <th>Раса</th>
                  <th>Старост</th>
                  <th>Сопственик</th>
                  <th>Телефон</th>
                  <th>Боја</th>
                  <th>Евиденција</th>
                </tr>
              </thead>
                {petData && petData.map(pet=>{
                    
                    return (<thead>
                        <tr>
                            <td>{pet.name}</td>
                            <td>{pet.animal}</td>
                            <td>{pet.breed}</td>
                            <td>{pet.age}</td>
                            <td>{pet.owner_Name ? pet.owner_Name : '/'}</td>
                            <td>/</td>
                            <td>{pet.color}</td>
                            <td><button className='btn btn-outline-success'>Види</button></td>
                        </tr>
                    </thead>)
                })}
        </table>
      </div>
    </div>
  )
}

export default MedicalEvidence

import React from 'react'
import { useState } from 'react'
const ShopSidebar = ({categorySelected, searchItemSelected, animalSelected}) => {
    const [selectedCategory,setSelectedCategory] = useState('site')
    const [searchItem,setSearchItem] = useState('')
    const [selectedAnimal,setSelectedAnimal] = useState('site')

    const handleSelectedAnimal = (e) =>{
        animalSelected(e.target.value)
        setSelectedAnimal(e.target.value)
    }
  
    const handleSearchItem = (e)=>{
      searchItemSelected(e.target.value)
      setSearchItem(e.target.value)
    }
  
    const handleCategory = (category) =>{
      categorySelected(category)
      setSelectedCategory(category)
    }

  return (
    <div className='shopSidebar'>
        <div className="shopSidebarContainer">
            <input type="search" className='form-control disappear reduce' placeholder='Пребарај на кирилица' onChange={(e)=>handleSearchItem(e)}/>
            <div className="shopSidebarContent">
                <h5 className='disappear'>Категорија</h5>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb disappear">
                        <li className="breadcrumb-item active" aria-current="page">Продавница</li>
                    </ol>
                </nav>

            <ul className='sidebar-list disappear'>
                <li className={`${selectedCategory === 'site' ? 'active': ''}`} ><a onClick={()=>handleCategory('site')} href='#'>Сите</a></li>
                <li className={`${selectedCategory === 'hrana' ? 'active': ''}`} ><a onClick={()=>handleCategory('hrana')}>Храна</a></li>
                <li className={`${selectedCategory === 'lekovi' ? 'active': ''}`}><a onClick={()=>handleCategory('lekovi')}>Лекови</a></li>
                <li className={`${selectedCategory === 'odrzuvanje' ? 'active': ''}`}><a onClick={()=>handleCategory('odrzuvanje')}>Одржување</a></li>
                <li className={`${selectedCategory === 'galanterija' ? 'active': ''}`}><a onClick={()=>handleCategory('galanterija')}>Галантерија</a></li>
            </ul>

            <select value={selectedAnimal} onChange={(e) => handleSelectedAnimal(e)} className='form-select myselect disappear reduce'>
              <option value='site'>Одберете милениче</option>
              <option value="kuce">Куче</option>
              <option value="macka">Мачка</option>
              <option value="zajak">Зајак</option>
              <option value="papagal">Папагал</option>
              <option value="ribi">Риби</option>
              <option value="ostanato">Останато</option>
            </select>
            </div>
            
        </div>
      
    </div>
  )
}

export default ShopSidebar

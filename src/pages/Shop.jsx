import { useEffect, useState } from 'react';
import Product from '../components/user/Product'
import Search from '../img/icons8-search-48.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { toast } from 'react-toastify';
import axios from 'axios';
const Shop = () => {

  const [selectedCategory,setSelectedCategory] = useState('site')
  const [searchItem,setSearchItem] = useState('')
  const [selectedAnimal,setSelectedAnimal] = useState('site')


  const handleSelectedAnimal = (e) =>{
    const selectedValue = e.target.value

      setSelectedAnimal(selectedValue)
      console.log("Selected animal",e.ta)

  }


  const handleSearchItem = (e)=>{
    setSearchItem(e.target.value)
  

  }

  const handleCategory = (category) =>{
    setSelectedCategory(category)
  
  }

  
  return(
    <div className='shop-container'>
      <Product category={selectedCategory} item={searchItem} animal={selectedAnimal} />
      <div className='shop-sidebar'>
          <div className="input-group">
            <div className="form-outline" data-mdb-input-init>
              <input type="search" id="form1" className="form-control disappear reduce" onChange={handleSearchItem} placeholder='Пребарај на кирилица'/>
            </div>
        </div>
          <h5 className='disappear'>Категорија </h5>
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
  )
}

export default Shop

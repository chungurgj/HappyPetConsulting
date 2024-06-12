import { useEffect, useState } from 'react';
import Product from '../components/user/Product'
import Search from '../img/icons8-search-48.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ShopSidebar from '../components/user/ShopSidebar';
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
      <ShopSidebar/>
      <Product category={selectedCategory} item={searchItem} animal={selectedAnimal} />
    </div>
  )
}

export default Shop

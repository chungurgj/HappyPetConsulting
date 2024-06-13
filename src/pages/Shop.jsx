import { useEffect, useState } from 'react';
import Products from '../components/user/Products'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ShopSidebar from '../components/user/ShopSidebar';
const Shop = () => {

  const [selectedCategory,setSelectedCategory] = useState('site')
  const [searchItem,setSearchItem] = useState('')
  const [selectedAnimal,setSelectedAnimal] = useState('site')

  return(
    <div className='shop-container'>
      <ShopSidebar categorySelected={setSelectedCategory} searchItemSelected={setSearchItem} animalSelected={setSelectedAnimal}/>
      <Products category={selectedCategory} item={searchItem} animal={selectedAnimal} />
    </div>
  )
}

export default Shop

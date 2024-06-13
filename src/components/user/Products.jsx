import { useEffect, useState } from 'react';
import {  toast } from 'react-toastify';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

const Products = (props) => {
  const [quantity, setQuantity] = useState(0);
  const [chosenProduct, setChosenProduct] = useState('');
  const [productQuantities, setProductQuantities] = useState({});
  const [dbProducts,setDbProducts] = useState([])
  

  const { addToCart, updateCartItemQuantity, cartItems } = useCart();

  const handleQuantity = (productId, enteredQuantity) => {
    const validQuantity = Math.max(0, parseInt(enteredQuantity, 10));

    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: validQuantity,
    }));
  };

  const handleChosenProduct = (productName, productId) => {
    const selectedQuantity = productQuantities[productId];
    setChosenProduct(productName);
    setQuantity(selectedQuantity);
  
    const product = dbProducts.find((item) => item.id === productId);
  
    if (!product) {
      toast.error("Овој продукт не е пронајден");
      return;
    }
  
    if (selectedQuantity > 0) {
      const existingCartItem = cartItems.find((item) => item.product.id === productId);
  
      if (existingCartItem) {
        const updatedQuantity = selectedQuantity + existingCartItem.quantity;
        updateCartItemQuantity(productId, updatedQuantity);
        toast.success("Продуктот е внесен во кошничката");
      } else {
        addToCart(
          {
            id: productId,
            title: productName,
          },
          selectedQuantity
        );
  
        toast.success("Продуктот е внесен во кошничката");
        
      }
    } else {
      toast.error(`Ве молиме одберете количина на ${productName}`);
    }
  };
  
  useEffect(()=>{
    console.log(props.animal)
  },[props.animal])

  useEffect(()=>{
    console.log(props.item)
    axios.get(`https://localhost:7176/api/Product?filterOn=title&filterQuery=${props.item}&filterCategory=${props.category}&filterAnimal=${props.animal}`)
      .then(response=>{
        console.log(response.data)

        setDbProducts(response.data)
      })
      .catch(error=>console.error(error))
  },[props.item,props.category,props.animal ])

  return (
   
    <div className="productsContainer">
      {dbProducts && dbProducts.map(product=>(
        <div className="productBox" key={product.id}>
          <div className="productContent">
            <div className="productImg">
              <img src={product.imgURL}  alt={product.title} className='product-img'/>
            </div>
            <hr/>
            <div className="detail">
             <div className="product-info">
             <h4 className="title">{product.title}</h4>
             <p className="cena">{product.price} денари</p>
           </div>
            <div className='productGroup'>
              <button onClick={() => handleChosenProduct(product.title, product.id)} className="btn btn-danger ">Кошничка</button>
               <input
                onChange={(e) => handleQuantity(product.id, e.target.value)}
                className='form-control quantity-button'
                type="number"
                placeholder='0'
                value={productQuantities[product.id] || 0}
              />
            </div>

          </div>
              
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;

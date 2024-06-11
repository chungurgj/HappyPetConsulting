import ReactDOM from 'react-dom';
import '../style.css';
import Close from '../../img/close.png';
import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';

const Modal = ({ open, onClose }) => {
  const { cartItems } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [dbProducts,setDbProducts] = useState([])

  useEffect(()=>{
    axios.get('https://localhost:7176/api/Product')
      .then(response=>{
        setDbProducts(response.data)
      })
      .catch(error=>console.error(error))
  },[])
  
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [open]);

  const handlePrice = (productId, quantity) => {
    const product = dbProducts.find((item) => item.id === productId);

    if(product && product.price){
      return product.price * quantity;
    }
    return 0
  };

  const handleTotalPrice = () => {
    let totalPriceNow = 0;

    if (cartItems) {
      cartItems.forEach((item) => {
        totalPriceNow += handlePrice(item.product.id, item.quantity);
      });
    }

    setTotalPrice(totalPriceNow);
  };

  useEffect(() => {
    handleTotalPrice();
  }, [cartItems]);

  const handleModalItems = () => {
    if (cartItems && dbProducts.length>0) {
      return cartItems.map((item) => (
        <div className='modal-product' key={item.product.id}>
          <div className='product-position'>
            <p className='modal-product-title'>{item.product.title} x{item.quantity}  </p>
            <p className='modal-product-price'>{handlePrice(item.product.id, item.quantity)} ден.</p>
          </div>
        </div>
      ));
    } // Remove the extra closing curly brace here
    return null;
  };
  

  return ReactDOM.createPortal(
    <>
      {open && (
        <div className='overlay'>
          <div className='modal-container'>
            <div className='modal-container-header'>
              <h5 className='modal-header'>НАПЛАТА</h5>
              <img onClick={onClose} src={Close} height={30} width={30} className='close-button' alt='close-button' />
            </div>
            <div className='modal-main'>
              <div className='modal-product-container'>{handleModalItems()}</div>
              <div className='modal-price-container'>
                <hr />
                <div className='totalprice-position'>
                  <p>Вкупно:</p>
                  <p>{totalPrice} денари</p>
                </div>
                <button className='btn btn-success kupi-button'>КУПИ</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('portal')
  );
};

export default Modal;

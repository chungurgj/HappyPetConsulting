import React, { useEffect, useState } from 'react';
import Logo from '../../img/c1.png';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useLocation } from 'react-router-dom';
import Cart from '../../img/cart.png';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';
import { useName } from '../contexts/NameContext';
import Modal from '../modals/Modal';
import Close from '../../img/close.png'
import ModalProfile from '../modals/ModalProfile';
import ModalPet from '../modals/ModalPet';
import UserImg from '../../img/user3.png'

const Navbar = () => {
  const location = useLocation();
  const [containerOpen, setContainerOpen] = useState(false);
  const [profileContainerOpen, setProfileContainerOpen] = useState(false);

  let timeoutId;
  let timeoutId2;
  const {cartItems,removeFromCart,clearCart} = useCart()

  const [isOpenProfile,setIsOpenProfile] = useState(false)
  const {loggedIn,isLoggedIn,email,roles} = useName();
  const [isOpen,setIsOpen] = useState(false)
  const [selectedChangeInfo,setSelectedChangeInfo] = useState('default')
  const [isOpenPet,setIsOpenPet] = useState(false)

  const handleClearCart = () =>{
    clearCart()
  }

  const handleContainerOpen = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      setContainerOpen(true);
      setProfileContainerOpen(false)
    }, 300);
  };

  const handleContainerClose = () => {
    clearTimeout(timeoutId)
   timeoutId=setTimeout(()=>{
    setContainerOpen(false);
   },300)
  };

  const handleProfileContainerOpen = () => {
    clearTimeout(timeoutId)
    timeoutId2 = setTimeout(() => {
      setProfileContainerOpen(true);
      setContainerOpen(false)
    }, 300);
  };

  const handleProfileContainerClose = () => {
    clearTimeout(timeoutId)
   timeoutId2=setTimeout(()=>{
    setProfileContainerOpen(false);
   },300)
  };

  const handleRemove = (id) =>{
    removeFromCart(id)
  }

  const clearLocalStorage = () =>{
    localStorage.removeItem("user_name")
    localStorage.removeItem("password")
    localStorage.removeItem("email")
    localStorage.removeItem("id")
    localStorage.removeItem("roles")
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("name")
    isLoggedIn(false)
  }

  const handleLogOut = () =>{
    clearLocalStorage();
    setTimeout(()=>{
      toast.success("Успешно се одјавивте")
    },350)

  }

  const handleModal = () =>{
    setIsOpen(true)
  }

  const handleSelectedChangeInfo = (e) =>{

    const selectedValue = e.target.value
    setSelectedChangeInfo(selectedValue)

    if(selectedValue==='user-info'){
      handleProfileModal()
    }
    else if(selectedValue==='pet-info'){
      handlePetModal()
    }

    setSelectedChangeInfo('default')
  }

  const handlePetModal = () =>{
    setIsOpenPet(true)
  }

  const handleProfileModal = () =>{
    setIsOpenProfile(true)
  }

  const handlePopupContents = () =>{
      if(containerOpen){
        if(cartItems.length===0){
          return <p>Кошничката е празна</p>
        }
        return cartItems.map((item) => (
          item.product && item.product.title && (
            <div key={item.product.id} className='cart-item'>
              <div className='remove-container' onClick={() => handleRemove(item.product.id)}>
                <p>{item.product.title} x{item.quantity}</p>
              </div>
            </div>
          )
        ));
        
      }
      else if(profileContainerOpen){
        return (
          <div>
           
            <p className='profile-tab'>Мои нарачки</p>

            <select value={selectedChangeInfo ? selectedChangeInfo : 'default'} onChange={(e) => handleSelectedChangeInfo(e)} className='form-select'>
              <option value='default' >Лични податоци</option>
              <option value="user-info">Име,емаил,лозинка</option>
              <option value="pet-info">Милениче</option>
            </select>
            <button onClick={handleLogOut} className='btn btn-danger logout'>Одјави се</button>
          </div>
        )
      }
  }
  
  return (
    <div className='myfont '>
      <Modal open={isOpen} onClose={()=>setIsOpen(false)}></Modal>

      <ModalProfile open={isOpenProfile} onClose={()=>setIsOpenProfile(false)}></ModalProfile>

      <ModalPet open={isOpenPet} onClose={()=>setIsOpenPet(false)}/>

      

      <nav className="navbar navbar-expand-lg bg-light navbar-light fixed-top">
        <div className="container position-relative">
          <a className="navbar-brand" href="#"><img src={Logo} height={70} /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="sidebar offcanvas offcanvas-start " tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header border-bottom">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <img src={Logo} height={70} />
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body d-flex flex-column flex-lg-row p-4 p-lg-0 ">
              <ul className="navbar-nav justify-content-center align-items-center flex-grow-1 pe-3">
                <li className="nav-item mx-2">
                  <a className={`nav-link ${location.pathname==='/' ? 'active' : ''}`} aria-current="page" href="/">Почетна</a>
                </li>
                
                <li className="nav-item mx-2">
                  <a className={`nav-link ${location.pathname==='/shop' ? 'active' : ''}`} href="/shop">Продавница</a>
                </li>
                <li className="nav-item mx-2">
                  <a className={`nav-link ${location.pathname.startsWith('/consultation') ? 'active' : ''}`} href="/consultation">Консултација</a>
                </li>
                <li className="nav-item mx-2">
                  <a className={`nav-link ${location.pathname==='/vetvisit' ? 'active' : ''}`} href="/vetvisit">Закажи преглед</a>
                </li>
               {roles && typeof roles === 'string' && roles.toLowerCase() === 'admin' ? <li className="nav-item mx-2">
                  <a className={`nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`} href="/admin">Админ</a>
                </li> : <></>}
                {roles && typeof roles === 'string' && roles.toLowerCase() === 'vet' ? <li className='nav-item mx-2'>
                <a className='nav-link' href="/vet/visits">Ветеринар</a>
                </li> : <></>}
              </ul>
              <div className='nav-right'>
                <img src={Cart} height={40} className='cartImg' onMouseEnter={handleContainerOpen} onMouseLeave={handleContainerClose}/>
                {containerOpen && (
                  <div className="popUp cart-popup" onMouseEnter={handleContainerOpen} onMouseLeave={handleContainerClose}>
                    <h5>Кошничка</h5>
                    <div className='popUp-container'>
                        {handlePopupContents()}
                    </div>
                    <div className='button-group'>
                      <button onClick={handleModal} className='btn btn-success popUp-button'>НАРАЧАЈ</button>
                      <img src={Close} height={30} className='popUp-close close-button' onClick={handleClearCart} />
                    </div>
                    
                  </div>
                )}
                
               
                {loggedIn ? (
                  <div className='nav-right'>
                      <h5 className='popUp-name' onMouseEnter={handleProfileContainerOpen} onMouseLeave={handleProfileContainerClose}>
                        <img src={UserImg}  alt="Профил" width={38} height={38} />
                      </h5>
                      {profileContainerOpen && (
                        <div className='popUp popUp-profile' onMouseEnter={handleProfileContainerOpen} onMouseLeave={handleProfileContainerClose}>
                          <h5 >{email}</h5>
                            <div className='popUp-container'>
                              {handlePopupContents()}
                            </div>
                        </div>
                      )}
                  </div>
                ) : (
                  <div>
                      <a href='/login' className='text-black'>Најави се</a>
                      <a href='/signup' className='text-white text-decoration-none px-3 py-2 rounded-4 signupcolor'>Регистрирај се</a>
                  </div>
                )}
                
               
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

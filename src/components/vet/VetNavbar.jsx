import React,{useEffect, useState} from 'react'
import Logo from '../../img/c1.png'
import { Link, useNavigate } from 'react-router-dom'
import Vet from '../../img/Vet.png'
import { useName } from '../contexts/NameContext'
import { toast } from 'react-toastify'
useNavigate
const VetNavbar = () => {
  const [popUpOpen,setPopUpOpen] = useState(false)
  const {name,isLoggedIn} = useName()
  const navigate = useNavigate()

  useEffect(()=>{
    console.log("name ",name)
  },[])

  const openPopUp = () =>{
    setTimeout(() => {
      setPopUpOpen(true)
    }, 300);
    
  }
  const closePopUp = () =>{
    setTimeout(() => {
      setPopUpOpen(false)
    }, 300);
    
  }
  const navigateHome = () =>{
    navigate('/')
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
    clearLocalStorage()
    toast.success("Успешно се одјавивте")
  }
  
  return (
    <div className='myfont'>
      <nav className="navbar navbar-expand-lg bg-light navbar-light fixed-top ">
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
                
              <li className="nav-item mx-2 dropdown">
                    <a className={`nav-link dropdown-toggle ${location.pathname.startsWith('/vet/visits') || location.pathname.startsWith('/vet/medical-records')  ? 'active' : ''}`} href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Прегледи</a>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <Link className="dropdown-item" to="/vet/visits">Евиденција на прегледи</Link>
                      <Link className="dropdown-item" to="/vet/visits/pets">Медицинска евиденција</Link>
                      
                    </div>
                </li>

                <li className="nav-item mx-2 dropdown">
                    <a className={`nav-link dropdown-toggle ${location.pathname.startsWith('/vet/consultation') ? 'active' : '' }`} href="#" role="button" id="dropdownMenuLink" 
                    data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Консултации</a>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <Link className="dropdown-item" to="/vet/consultations">Евиденција</Link>
                      <Link className="dropdown-item" to="/vet/consultations/today">Денес</Link>
                      
                    </div>
                </li>
                
              </ul>

                <ul className="navbar-nav justify-content-end align-items-center flex-grow-1 pe-3">
                  <li className='nav-item mx-2'>
                    <img src={Vet} height={50} width={50} onMouseEnter={openPopUp} onMouseLeave={closePopUp}/>
                    <div className={`vet-popUp ${popUpOpen ? '' : 'd-none'}`} onMouseEnter={openPopUp} onMouseLeave={closePopUp}>
                        <h6>{name}</h6>
                        <div className='vet-popUp-main'>
                          <p className='vet-popUp-item' onClick={navigateHome}>Почетна</p>
                          <p className='vet-popUp-item'>Ваши прегледи</p>
                          <p className='vet-popUp-item'>Ваш профил</p>
                          <p className='vet-popUp-item' onClick={handleLogOut}>Одјави се</p>
                        </div>
                       
                    </div>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default VetNavbar

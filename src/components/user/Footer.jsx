import '../style.css'
import Maps from '../../img/location3.png'
import Telefon from '../../img/phone2.png'
import Facebook from '../../img/facebook.png'
import Logo from '../../img/c1.png'
const Footer = () => {
  return (
    <div className='footer-container bg-dark'>
       <div className='footer-info container'>
          <div className='maps info'>
            <img src={Maps} height={50} className='footer-icon'/>
            <div className='info-text'>
              <p>Пронајдете не на</p>
              <h2> Google Maps</h2>
            </div>
          </div>
          <div className='telefon info'>
            <img src={Telefon} height={50} className='footer-icon'/>
            <div className='info-text'>
              <p>Јавете се на телефон:</p>
              <h2>075-365/666</h2>
            </div>
          </div>
          <div className='instagram info'>
            <img src={Facebook} height={50} className='footer-icon'/>
            <div className='info-text'>
              <p>Заследете не на</p>
              <h2>Facebook</h2>
            </div>
          </div>
       </div>
       <div className='mycontainer'>
          <img src={Logo} height={100}/>
          <ul className='footerlist'>
            <li>За нас</li>
            <li>FAQ</li>
            <li>Правила за користење</li>
          </ul>
          <ul className='footerlist'>
            <li>Онлајн консултации</li>
            <li>Онлајн пазарење</li>
            <li>Онлајн закажување</li>
          </ul>
       </div>
       
    </div>
  )
}
 
export default Footer

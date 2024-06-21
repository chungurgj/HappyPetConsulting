import CoverImage from '../../img/c3.jpg'
import '../style.css' 
import CoverText from '../../components/CoverText'
import Dog from '../../img/dog-poster.png'
import { useNavigate } from 'react-router-dom'

const Cover = () => {
  const navigate = useNavigate()
  return (
    <div className='coverImg'>
      <div className='coverContent'>
        <CoverText/>
        <p className='coverSubtext'>Закажете го вашето прво онлајн советување или <br/> физички преглед за неколку минути.</p>
     
          <button className='btn btn-success coverbtn vetbtn'>Онлајн консултација</button>
          
      </div>
     
    </div>
  )
}

export default Cover

import CoverImage from '../../img/c3.jpg'
import '../style.css' 
import CoverText from '../../components/CoverText'
import Dog from '../../img/dog-poster.png'
import { useNavigate } from 'react-router-dom'
const Cover = () => {
  const navigate = useNavigate()
  return (
    <div className='coverimg '>
      <div className="cover-position gap-5">
      <div >
        <img src={Dog} width={370} className='dogimg'/>
      </div>
      <div className="text-button-cont gap-4">
        <CoverText/>
        <button className="btn  start-cover-btn" onClick={()=>navigate('/consultation')}>Започни веднаш</button>
      </div>
      
      </div>
    </div>
  )
}

export default Cover

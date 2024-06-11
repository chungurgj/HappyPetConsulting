
import { useNavigate } from 'react-router-dom'
import Emergency from '../img/emergency.png'
import Text from '../img/text.png'
import Video from '../img/camera.png' 

const Consultation = () => {

  const navigate = useNavigate()

  return ( 
      <div className='cons-nav-main'>
        <div className='cons-nav-content'>
        <div className='consult'>
        <img src={Video} height={48} width={48}/>
          <h5>Видео советување</h5>
          <div className='align-consult'>
            <small>Добивате детална консутлација на вашето милениче преку видео повик, најпогодно кога ситуацијата не е
              живото-загрозувачка и немате пристап до добар ветеринар.
            </small>
            <button className='btn btn-success' onClick={()=>navigate('/consultation/video')}>Продолжи</button>
          </div>
          
        </div>
        <div className='consult'>
          <img src={Emergency} height={48} width={48}/>
          <h5>Итно советување</h5>
          <div className='align-consult emerg'>
            <small>Добивате консултација во рок од 15 минути од плаќањето, со јасни инструкции за спасување на вашето милениче додека да добиете 
              професионална помош. Најпогодно во живото-загрозувачки ситуации додека да добиете пристап до ветеринар.
            </small>
            <button className='btn btn-success ' onClick={()=>navigate('/consultation/emergency')}>Продолжи</button>
          </div>
          
        </div>
        <div className='consult'>
        <img src={Text} height={48} width={48}/>
          <h5>Текстуално советување</h5>
          <div className='align-consult'>
            <small>Можете да поставите најразлични прашања за вашето милениче, исхраната, лекови и слично. Добивате повратен одговор во рок од 1 час.
            </small>
            <button className='btn btn-success' onClick={()=>navigate('/consultation/text')}>Продолжи</button>
          </div>
         
        </div>
      </div>
      </div>
  )
}

export default Consultation

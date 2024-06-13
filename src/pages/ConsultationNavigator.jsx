
import { useNavigate } from 'react-router-dom'
import Emergency from '../img/emergency.png'
import Text from '../img/text.png'
import Video from '../img/camera.png' 
import ConsNavComp from '../components/ConsNavComp'
const Consultation = () => {

  const navigate = useNavigate()

  return ( 
      <div className="consNavContainer">
        <ConsNavComp imgUrl={Video} title={'Видео советување'} text={'Добивате детална консутлација на вашето милениче преку видео повик, најпогодно кога ситуацијата не е живото-загрозувачка и немате пристап до добар ветеринар.'}/>
        <ConsNavComp imgUrl={Emergency} title={'Итно советување'} text={'Добивате консултација во рок од 15 минути од плаќањето, со јасни инструкции за спасување на вашето милениче додека да добиете професионална помош. Најпогодно во живото-загрозувачки ситуации додека да добиете пристап до ветеринар.'}/>
        <ConsNavComp imgUrl={Text} title={'Текстуално советување'} text={'Можете да поставите најразлични прашања за вашето милениче, исхраната, лекови и слично. Добивате повратен одговор во рок од 1 час.'}/>
      </div>
  )
}

export default Consultation

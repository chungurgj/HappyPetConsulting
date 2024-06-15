

import Emergency from '../img/emergency.png'
import Text from '../img/text.png'
import Video from '../img/camera.png' 
import ConsNavComp from '../components/ConsNavComp'
const Consultation = () => {

  return ( 
      <div className="consNavContainer">
        <ConsNavComp imgUrl={Video} title={'Видео советување'} text={'Добивате детална консутлација на вашето милениче преку видео повик, најпогодно кога ситуацијата не е живото-загрозувачка и немате пристап до добар ветеринар.'} navLocation={'/consultation/video'}/>
        <ConsNavComp imgUrl={Text} title={'Текстуално советување'} text={'Можете да поставите најразлични прашања за вашето милениче, исхраната, лекови и слично. Добивате повратен одговор во рок од 1 час.'} navLocation={'/consultation/text'}/>
      </div>
  )
}

export default Consultation

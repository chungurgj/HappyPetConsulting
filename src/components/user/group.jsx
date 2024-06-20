
import GroupComponent from "./GroupComponent"
import Consult from '../../img/consult2.jpg'
import ShoppingImg from '../../img/shopping.png'
import PregledImg from '../../img/pregled.avif'
const group = () => {
  return (
    <div className="groupPadding">
      <GroupComponent title={'Бесплатна прва консултација'} subtitle={'Овој вид на советување е идеален кога:'} image={Consult} 
      r1={'Не сте во можност да ја посетите амбулантата'} r2={'Сте на одмор'} r3={'Не знаете дали има потреба од физичка посета на амбулантата'}/>
      <GroupComponent title={'Нарачајте online, заштедете време'} subtitle={'Ваквото пазарење ви нуди:'} image={ShoppingImg} 
      r1={'Да не чекате на ред за купување храна или други производи'} r2={'Достава до дома'} r3={'Одбирање на брзина на достава'}/>
      <GroupComponent title={'Онлајн закажување на преглед'} subtitle={'Закажувањето од компјутер ви нуди:'} image={PregledImg} 
      r1={'Да не чекате на ред'} r2={'Можност да презакажете'} r3={'Закажување на итен преглед'}/>
    </div>
  )
}

export default group

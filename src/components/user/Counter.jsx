import ClientImg from '../../img/service.png'
import SovetuvanjaImg from '../../img/consulting.png'
import NarackiImg from '../../img/shopping-bag.png'
import Count from './Count'

const Counter = () => {
  return (
   <div className='counter-container'>
        <Count limit={2042} speed={5} header='Задоволни клиенти' img={ClientImg}/>
        <Count limit={243} speed={1} header='Одржани советувања' img={SovetuvanjaImg}/>
        <Count limit={3204} speed={6} header='Направени нарачки' img={NarackiImg}/>
   </div>
  )
}

export default Counter

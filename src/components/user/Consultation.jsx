import Consult from '../../img/consult2.jpg'

const Consultation = () => {
  return (
    <div className='group-container' >
        <div className='group-text' >
            <h1 className='impact'>Бесплатна прва консултација</h1>
            <p>Овој вид на советување е идеален кога:</p>
            <ul>
                <li>Не сте во можност да ја посетите амбулантата</li>
                <li>Сте на одмор</li>
                <li>Не знаете дали има потреба од физичка посета на амбулантата</li>
            </ul>
            <button className='btn btn-success group-btn'>Кликни тука</button>
        </div>
        <img src={Consult} height={350} width={350} className='group-img'/>
    </div>
  )
}

export default Consultation

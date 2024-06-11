import PregledImg from '../../img/pregled.avif'
const Appointment = () => {
  return (
    <div className='group-container' >
        <div className='group-text'>
            <h1 className='impact'>Онлајн закажување на преглед</h1>
            <p>Закажувањето од компјутер ви нуди:</p>
            <ul>
                <li>Да не чекате на ред</li>
                <li>Можност да презакажете</li>
                <li>Закажување на итен преглед</li>
            </ul>
            <button className='btn btn-success group-btn'>Кликни тука</button>
        </div>
        <img src={PregledImg} height={350} width={350} className='group-img'/>
    </div>
  )
}

export default Appointment

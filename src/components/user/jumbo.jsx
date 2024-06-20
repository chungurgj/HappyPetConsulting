import '../style.css'

const Jumbo = () => {
  return (
    <div className="jumboSection">
        <div className='box'>
          <h3 className='box-text'>Порачајте онлајн</h3>
          <p>Посетете ја нашата олнајн-продавница</p>
          <button className='btn btn-success vetbtn box-btn'>ПРОДАВНИЦА</button>
        </div>
        <div className='box'>
          <h3 className='box-text'>Закажете преглед</h3>
          <p>Брза постапка за закажување на детална анализа</p>
          <button className='btn btn-success vetbtn box-btn'>ЗАКАЖИ</button>
        </div>
        <div className='box'>
          <h3 className='box-text'>Закажете онлајн консултација</h3>
          <p>Во случај да ви треба онлајн анализа</p>
          <button className='btn btn-success vetbtn box-btn'>ЗАКАЖИ</button>
        </div>
    </div>
  )
}

export default Jumbo

import ShoppingImg from '../../img/shopping.png'

const Shopping = () => {
  return (
    <div className='group-container' >
        <img src={ShoppingImg} height={350} width={350} className='group-img'/>
      <div className='group-text'>
        <h1 className='impact'>Нарачајте online, заштедете време</h1>
        <p>Ваквото пазарење ви нуди:</p>
            <ul>
                <li>Да не чекате на ред за купување храна или други производи</li>
                <li>Достава до дома</li>
                <li>Одбирање на брзина на достава</li>
            </ul>
            <button className='btn btn-success group-btn'>Кликни тука</button>
      </div>
    </div>
  )
}

export default Shopping

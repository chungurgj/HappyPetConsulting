import ReactDOM from 'react-dom';
import { ThreeDots } from 'react-loader-spinner';

const ModalLoading = ({ open }) => {
  return ReactDOM.createPortal(
    open && (
      <div className='overlay-loading'>
          <div className='loader'>
            <ThreeDots color='#006D77' height={100} width={100} />
          </div>
      </div>
    ),
    document.getElementById('loading')
  );
};

export default ModalLoading;

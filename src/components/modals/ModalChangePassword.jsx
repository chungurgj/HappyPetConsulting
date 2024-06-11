import  ReactDOM  from "react-dom"

const ModalChangePassword = ({open,onClose}) => {
    
  return ReactDOM.createPortal(
    <>
      
    </>,
    document.getElementById('changePassword')
  )
}

export default ModalChangePassword

import Logo from '../img/c1.png'
import Google from '../img/google.png'

import { gapi } from 'gapi-script'
import { useEffect, useState } from 'react'
const clientID = "158744727787-jrt4rlq8i0a8tq5g0oglhvelsrlgkcub.apps.googleusercontent.com"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import validator from 'validator'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [email,setEmail]=useState('')
    const [name,setName] = useState('')
    const [passwordCheck,setPasswordCheck]=useState('')
    const [passwordCheck2,setPasswordCheck2]=useState('')
    const [loading,setLoading] = useState(false)

    const data = {
        name:name,
        email:email,
        password:passwordCheck,
        
    }
   
    const navigate = useNavigate()

    const handleName = (e) =>{
        setName(e.target.value)
    }

    const handleEmail = (e) =>{
        setEmail(e.target.value)
    }
    const handlePasswordCheck = (e) =>{
        
        setPasswordCheck(e.target.value)
    }
    const handlePasswordCheck2 = (e) =>{
        setPasswordCheck2(e.target.value)
        
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        setLoading(true)
        if( email && passwordCheck && passwordCheck2 && passwordCheck===passwordCheck2){
            if(validator.isEmail(email)){
            const containsNumbers = /\d/.test(passwordCheck);
            if(passwordCheck.length>8 && containsNumbers){
                console.log(data)


            axios.post('https://localhost:7176/api/Auth/Register',data)
                .then(response=>{
                    console.log("Success ", response)
                    toast.success("Успешно регистриран")
                    setTimeout(()=>{
                        setLoading(false)
                        navigate('/login')
                    },1000)
                })
                .catch(error=>{
                    console.error("Error ",error)
                    toast.error(error)
                })

            }
            else{
                toast.error("Лозинката мора да има најмалку 8 карактери и да содржи бројки")
            }
        }
        else{
            toast.error("Емаилот мора да содржи @ и .")
        }
        }
        else {
            toast.error("Ве молиме внесете иста лозинка во двете полиња")
        }
        
    }
    
    useEffect(()=>{
        function start(){
            gapi.client.init({
                clientId:clientID,
                scope:""
            })
        }

        gapi.load('client:auth2',start)
    },[])

    useEffect(()=>{
        
    },[])
  return (
    <div className='signup-container'>
       
      <div className='signup'>
      <img src={Logo} height={80} width={200}/>
                <div className="login-header">
                     <h3>Регистрирајте се</h3>
                     <p>Вашето милениче ќе ви биде благодарно</p>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input onChange={(e)=>handleName(e)} type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Име"/>
                </div>
                <div className="input-group mb-3">
                    <input onChange={(e)=>handleEmail(e)} type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Емаил адреса"/>
                </div>
                <div className='pass-group'>
                    <div className="input-group mb-1">
                        <input onChange={(e)=>handlePasswordCheck(e)} type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Лозинка"/>
                    </div>
                    <div className="input-group mb-1 mm">
                        <input onChange={(e)=>handlePasswordCheck2(e)} type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Повтори лозинка"/>
                    </div>
                </div>
                
                <div className="input-group mb-3">
                    <button className="btn btn-lg btn-primary w-100 fs-6 uu" type='submit'>Регистрирај се</button>
                </div>
        
                <div className="row">
                    <small>Имаш профил? <a href="/login">Најави се</a></small>
                </div>
                </form>
      </div>
    </div>
  )
}

export default Signup

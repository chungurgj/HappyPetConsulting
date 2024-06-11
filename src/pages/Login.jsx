import Logo from '../img/c1.png'
import Google from '../img/google.png'

import { gapi } from 'gapi-script'
import { useEffect, useState } from 'react'
const clientID = "158744727787-jrt4rlq8i0a8tq5g0oglhvelsrlgkcub.apps.googleusercontent.com"
import {toast,ToastContainer} from 'react-toastify'
import axios from 'axios'
import { useNavigate ,Link} from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useName } from '../components/contexts/NameContext'


const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)

    const data = {
        email:email,
        password:password
    }
    const navigate = useNavigate()

    const {isLoggedIn,addRole,id} = useName()

    const handleEmail = (e)=>{
        setEmail(e.target.value)
    }

    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }


    const handleSubmit = (e) =>{
        setLoading(true)
        e.preventDefault()

        axios.post('https://localhost:7176/api/Auth/Login', data)
    .then(response => {
        console.log(response.data.jwtToken);
        const token = response.data.jwtToken;
        localStorage.setItem('token', token);
        toast.success("Успешно се логиравте");
        
        axios.get(`https://localhost:7176/api/Auth/user-role/${response.data.id}`)
            .then(response=>{
                addRole(response.data)
                
            })
            .catch(error=>{
                console.error(error)
            })
        setTimeout(() => {
            
            isLoggedIn(true, response.data.id, response.data.email,response.data.displayName);
            location.pathname = '/';
            console.log("ful ",response.data);
        },1000)
    })
    .catch(error => {
        console.error(error);
        toast.error("Неуспешно логирање");
    });


    }
    useEffect(() => {
        gapi.load('client:auth2', () => {
            gapi.client.init({
                clientId: clientID,
                scope: ""
            }).then(() => {
                // Initialization is complete, you can perform further actions here if needed
            });
        });
    }, []);


  return (
    <div className='login-container'>

      <div className='login'>
        <img src={Logo} height={80} width={200}/>
                <div className="login-header">
                     <h3>Добредојдовте во Happy Pet</h3>
                     <p>Најавете се и имајте среќно милениче</p>
                </div>
                <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <input onChange={(e)=>handleEmail(e)} type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Емаил адреса"/>
                </div>
                <div className="input-group mb-1">
                    <input onChange={(e)=>handlePassword(e)} type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Лозинка"/>
                </div>
                <div className="input-group mb-5 d-flex justify-content-between">
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="formCheck"/>
                        <label htmlFor="formCheck" className="form-check-label text-secondary"><small>Запамти ме</small></label>
                    </div>
                    <div className="forgot">
                        <small><a href="#">Заборавена лозинка?</a></small>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <button className="btn btn-lg btn-primary w-100 fs-6" type='submit'>Најави се</button>
                </div>
              
                <div className="row">
                    <small>Немаш профил? <a href="/signup">Регистрирај се</a></small>
                </div>
                </form>
          </div>
       </div>


  )
}

export default Login

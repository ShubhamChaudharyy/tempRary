import React, { useState, useContext} from "react";
import { useHistory } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import './Login.css'
import { AuthContext } from "./AuthContext";
import Illustration from '../../Assets/illustration2.png';

function Login() {
    let { login, user } = useContext(AuthContext);
    let history = useHistory()

    const [info, setInfo] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInfo({ ...info, [name]: value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('passing this info to the firebase server',info)
        try {
            let userObj = await login(info.email, info.password);
            let userId = userObj.user.uid;
            console.log('user in login.js ', userId)
            history.push("/dashboard");
        } catch (error) {
            console.log(error)
            console.log("Login failed")
        }
    }


  return (
    <>
      {
        user == null ? 
        <div className='login-outer'>
        <div className='login-inner'>
        <div className='login-innerLeft'>
              <h1>Log In Form</h1>
              <form className='form-container' onSubmit={onSubmit}>
                  <TextField id="standard-basic" name='email' label="Email" variant="standard" onChange={(e) =>handleChange(e)}/>
                  <TextField id="standard-basic" name='password' label="Password" variant="standard" onChange={(e) =>handleChange(e)}/>
                  <button type='submit'>Submit</button>
              </form>  
            </div>  
            <div className='login-innerRight'>
              <img src={Illustration}/>
            </div>     
        </div>
      </div>
      :history.push('/dashboard')
      }
    </>
  );
}

export default Login;

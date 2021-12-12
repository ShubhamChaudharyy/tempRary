import React, { useState, useContext} from "react";
import { useHistory } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import './Signup.css'
import { AuthContext } from "./AuthContext";
import { database } from "../../firebase";
import {Link} from 'react-router-dom'
import Illustration from '../../Assets/illustration.png'


function Signup() {
    let { signup, user } = useContext(AuthContext);
    let history = useHistory()

    const [info, setInfo] = useState({
        fullname: '',
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
        let userObj = await signup(info.email, info.password);
        let userId = userObj.user.uid;
        console.log('user in signup.js ', userId)
        let user = {
            name: info.fullname,
            email: info.email,
            uid: userId,
            country:"",
            pinCode:"",
            city:"",
        }
        database.users.doc(userId).set({
            ...user
        })
        history.push("/dashboard");
    }


  return (
    <>
      {
        user == null ? <div className='signup-outer'>
        <div className='signup-inner'>
            <div className='signup-innerLeft'>
              <h1>Sign Up Form</h1>
              <form className='form-container' onSubmit={onSubmit}>
                  <TextField id="standard-basic" name='fullname' label="Full Name" variant="standard" onChange={(e) =>handleChange(e)}/>
                  <TextField id="standard-basic" name='email' label="Email" variant="standard" onChange={(e) =>handleChange(e)}/>
                  <TextField id="standard-basic" name='password' label="Password" variant="standard" onChange={(e) =>handleChange(e)}/>
                  <button type='submit'>Submit</button>
                  <p>Already Signed up? <Link to='/login'>Login</Link></p>
              </form>  
            </div>  
            <div className='signup-innerRight'>
              <img src={Illustration} className='signup-illustration'/>
            </div>       
        </div>
      </div>: history.push('/dashboard')
      }
      
    </>
  );
}

export default Signup;



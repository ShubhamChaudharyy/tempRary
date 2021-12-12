import React, { useContext, useState, useEffect } from 'react'
import './Profile.css'
import Face from '../Assets/face.jpg'
import TextField from '@mui/material/TextField';
import { AuthContext } from '../Components/Auth/AuthContext'
import { database } from '../firebase';

function Profile() {
    const [edit, setEdit] = useState(false);
    const [updateInfo, setUpdateInfo] = useState({
        country: '',
        city:'',
        pinCode:'',
    });
    const [userInfo, setuserInfo] = useState({
        email:null,
        name:null,
        uid:null,
        country:null,
        pinCode:null,
        city:null,
    });
    const {user} = useContext(AuthContext)
    
    const showData = () => {
        console.log(userInfo)
    }

    useEffect(()=>{
        database.users.doc(user.uid).onSnapshot((snap)=>{
            const {email, name, uid, country, pinCode, city} = snap.data()
            setUpdateInfo({country, city, pinCode})
            console.log('useEffect setUpdateInfo', updateInfo)
            setuserInfo(() => {
                return {
                    email,
                    name,
                    uid,
                    country,
                    pinCode,
                    city
                }
            })
        })
    },[user.uid])

    const onChangeHandler = (e) => {
        console.log('as u type i change the values in state')
        setUpdateInfo({...updateInfo, [e.target.name]:e.target.value})
    }

    const updateHandler = (e) => {
        e.preventDefault()
        const {country, pinCode, city} = updateInfo;
        console.log('mein hu update Handler me baye baye ', updateInfo)
        database.users.doc(user.uid).update({
            country,
            pinCode,
            city
        }, setEdit(false))
        
    }

    return (
        
        <div className='profile-outer'>
            <div className='profile-inner'>
                <div className='profile-image'>
                    <img src={Face} className='profile-dp'/>
                </div>
                <div className='profile-details'>
                    <div className='profile-edit'>
                        <button onClick={() => setEdit(!edit)}>Edit Details</button>
                    </div>
                    <div>
                        <form className='profile-form' onSubmit={(e) => updateHandler(e)}>                            
                            <div className='profile-row'>
                                {userInfo.name ? <h3>{userInfo.name}</h3>: <TextField id="filled-basic" label="Name" variant="filled" />}
                                {userInfo.email ? <h3>{userInfo.email}</h3>: <TextField id="filled-basic" label="Email" variant="filled" />}
                            </div>
                            <div className='profile-row'>
                                {edit ? <TextField id="filled-basic" name='country' label="country" onChange={(e) =>onChangeHandler(e)} variant="filled" value={updateInfo.country}/> : (userInfo.country ?<h3>{userInfo.country}</h3> : <TextField id="filled-basic" label="country" variant="filled" />) }
                                {edit ? <TextField id="filled-basic" name='city' label="city" onChange={(e) =>onChangeHandler(e)} variant="filled" value={updateInfo.city}/> : (userInfo.city ?<h3>{userInfo.city}</h3> : <TextField id="filled-basic" label="city" variant="filled" />) }
                                {edit ? <TextField id="filled-basic" name='pinCode' label="pinCode" onChange={(e) =>onChangeHandler(e)} variant="filled" value={ updateInfo.pinCode}/> : (userInfo.pinCode ?<h3>{userInfo.pinCode}</h3> : <TextField id="filled-basic" label="pinCode" variant="filled" />) }
                            </div>
                            <div className='profile-row'>
                                <TextField id="filled-basic" label="Filled" variant="filled" />
                                <TextField id="filled-basic" label="Filled" variant="filled" />
                                <TextField id="filled-basic" label="Filled" variant="filled" />
                            </div>
                            {edit ? 
                            <button style={{ 
                                padding: '0.5rem 1.5rem 0.5rem 1.5rem',
                                backgroundColor: 'lightblue',
                                borderRadius: '10px',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.2), 0 10px 10px 0 rgba(0, 0, 0, 0.03)'    
                            }} type='submit'>Update</button> 
                            : null}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile

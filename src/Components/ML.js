import React,{useContext} from 'react'
import './ML.css'
import UploadFile from '../Components/UploadFile.js'
import { AuthContext } from '../Components/Auth/AuthContext'

function ML() {
    const { user } = useContext(AuthContext);

    return (
        <div className='machine-outer'>
            <div className='machine-inner'>
                <UploadFile user={user}/>
            </div>
        </div>
    )
}

export default ML

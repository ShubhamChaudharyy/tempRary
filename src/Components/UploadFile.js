import React,{useState} from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MovieIcon from '@mui/icons-material/Movie';
import LinearProgress from '@mui/material/LinearProgress';
import {v4 as uuidv4} from 'uuid'
import FirebaseClass  from '../firebase'
import ProgressBar from './ProgressBar'
import { useHistory } from "react-router-dom";
import Reports from './Reports'

function UploadFile({user}) {
    const dbObj = new FirebaseClass();
    const history = useHistory();
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [src,setSrc] = useState(null);
    const [progress,setProgress] = useState()

    const handleUpload = async (url,name,progress) => {
        if(url && name) {
            setSrc(url)
        }
        setProgress(progress)
    }

    const handleChange = async(file) => {
        if(file==null){
            setError("Please select a file first");
            setTimeout(()=>{
                setError('')
            },2000)
            return;
        }
        if(file.size/(1024*1024)>100){
            setError('This video is very big');
            setTimeout(()=>{
                setError('')
            },2000);
            return;
        }
        let uid = uuidv4();
        setLoading(true);
        const uploadTask = await dbObj.storeImage(file,handleUpload,user?._delegate?.uid)
    }
    
    return (
        <>
        {src && <Reports src={src}/>}
        {!src && 
        <div style={{marginTop:'5rem',marginBottom:'1rem'}}>
            {
                error!=''?<Alert severity="error">{error}</Alert>:
                <div style={{ display:"flex", flexDirection:'column',justifyContent:'center', alignItems:'center' }}>
                    {progress && <ProgressBar progressSoFar={Math.floor(progress)}/>}
                    {progress && <div>{Math.floor(progress)}%</div>}
                    <img
                        alt=""
                        src='' id='upload-img' 
                        style={{ width: '30rem', height: 'auto', display:'block' }}
                    />
                    <input type="file" onChange={(e)=>handleChange(e.target.files[0])} id="upload-input" style={{display:'none'}} />
                    <label htmlFor="upload-input">
                        <Button
                            variant="outlined"
                            color="secondary"
                            component="span"
                            disabled={loading}
                            style={{display:"block", width:"13rem", marginTop:'3rem'}}
                        >
                        <MovieIcon/>&nbsp;Upload Image
                        </Button>
                    </label>
                    {loading && <LinearProgress color="secondary" style={{marginTop:'3%'}} />}
                </div>
            }
        </div>
        }
        </>
    )
}

export default UploadFile
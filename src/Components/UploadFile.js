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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

function UploadFile({user}) {
    const dbObj = new FirebaseClass();
    const history = useHistory();
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [src,setSrc] = useState(null);
    const [progress,setProgress] = useState()
    const [reportType,setType] = useState(null)

    const handleUpload = async (url,name,progress) => {
        if(url && name) {
            setSrc(url)
        }
        setProgress(progress)
    }
    const handleOptions = (e) => {
        setType(e.target.value)
    }
    const handleChange = async(file) => {
        if(!reportType) {
            alert("Please select report type")
            return;
        }
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
        const uploadTask = await dbObj.storeImage(file,handleUpload,user?._delegate?.uid,reportType)
    }

    return (
        <>
        {src && <Reports src={src}/>}
        {!src && 
        <div style={{marginTop:'5rem',marginBottom:'1rem'}}>
            <div>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Report Type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={reportType}
                label="Report Type"
                onChange={handleOptions}
            >
                <MenuItem value={'CT-SCAN'}>CT SCAN</MenuItem>
                <MenuItem value={'XRAY'}>CHEST X-RAY</MenuItem>
                <MenuItem value={'ECG'}>ECG</MenuItem>
            </Select>
            </FormControl>
            </div>
            {
                error!=''?<Alert severity="error">{error}</Alert>:
                <div style={{ display:"flex", flexDirection:'column',justifyContent:'center', alignItems:'center' }}>
                    {progress && <ProgressBar progressSoFar={Math.floor(progress)}/>}
                    {progress && <div>{Math.floor(progress)}%</div>}
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
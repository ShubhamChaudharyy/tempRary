import React,{ useContext,useState,useEffect,useCallback } from 'react'
import FirebaseClass  from '../firebase'
import { AuthContext } from '../Components/Auth/AuthContext'
import Table from './Table'
function Reports({
  src
}) {
  const { user } = useContext(AuthContext);
  const [reportData,setReportData] = useState(null);

  const handleUpdate = useCallback(async() => {
    const dbObj = new FirebaseClass();
    const result = await dbObj.getReports(user?._delegate?.uid)
    if(!result) return;
    setReportData(result);
  },[user?._delegate?.uid])

  useEffect(()=>{
    handleUpdate();
  },[handleUpdate, src])

  return (
    <div className="reports-table">
      <Table rows={reportData} setReportData={setReportData}/>
    </div>
  )
}

export default Reports
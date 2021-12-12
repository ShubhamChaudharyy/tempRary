import React, { useContext, useState,useEffect } from 'react'
import LeftContainerMenu from './LeftContainerMenu'
import RightContainerHome from './RightContainerHome'
import './Dashboard.css'
import Navbar from '../Navbar'
import { AuthContext } from '../Auth/AuthContext'
import { useHistory } from 'react-router-dom'
import Profile from '../Profile'
import ML from '../ML'
import Reports from '../Reports'

function Dashboard() {
    let [focusMenuItem, setFocusMenuItem] = useState('Dashboard')
    const { user } = useContext(AuthContext)
    const history = useHistory()
    const components = [<RightContainerHome/>, <Profile/>, <Reports/>, <ML/>]
    const listItems = ['Dashboard', 'Profile', 'Reports', 'Upload Report']
    const onChangeHandler = (e) => {
        let name = e.target.getAttribute('name')
        if(name !== 'Dashboard' && name !== 'ML Model' && user == null){
            history.push('/signup')
            return;
        }
        setFocusMenuItem(e.target.getAttribute('name'))
    }
    return (
        <>
            <div  className='dashboard-container'>
                <Navbar/>
                <LeftContainerMenu onChangeHandler={onChangeHandler} focusItem={focusMenuItem}/>
                {
                    listItems.map((item, index) => {
                        return item == focusMenuItem ? components[index] :  null;
                    })
                }
            </div>
        </>
    )
}

export default Dashboard

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './LeftContainerMenu.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableViewIcon from '@mui/icons-material/TableView';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { AuthContext } from '../Auth/AuthContext';

function LeftContainerMenu({ onChangeHandler, focusItem }) {    

    const listItems = ['Dashboard', 'Profile', 'Reports', 'Upload Report']
    const iconItems = [DashboardIcon, TableViewIcon, AccountBoxIcon, AssessmentIcon, PrecisionManufacturingIcon]
    const { user } = useContext(AuthContext)

    return (
        <div className='LCM-outer-container'>
            <div className='LCM-inner-container'>
                <div className='LCM-heading'>
                    <h1>Dashboard</h1>
                </div>
                <hr/>
                <div className='LCM-list-container'>
                    <ul className='LCM-list'>
                        {
                            listItems.map((item, index) => {
                                const Icon = iconItems[index];
                                return(
                                    item == focusItem ? 
                                    <li key={index} className={`select`} name={`${item}`} onClick={(e) => onChangeHandler(e)}><Icon fontSize='small'/>&nbsp; {item}</li> : 
                                    <li key={index} name={`${item}`} onClick={(e) => onChangeHandler(e)}><Icon fontSize='small'/>&nbsp; {item}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LeftContainerMenu

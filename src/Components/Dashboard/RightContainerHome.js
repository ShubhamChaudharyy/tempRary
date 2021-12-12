import React,{useContext,useEffect} from 'react'
import './RightContainerHome.css'
import Card from './Card'
import Card2 from './Card2'
import Graph1 from '../../Assets/graph1.PNG'
import Graph2 from '../../Assets/graph2.PNG'
import Graph3 from '../../Assets/graph3.PNG'

import ChairIcon from '@mui/icons-material/Chair';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BungalowIcon from '@mui/icons-material/Bungalow';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import { AuthContext } from '../Auth/AuthContext'

function RightContainerHome() {
    const { cases,handleUpdates } = useContext(AuthContext)
    useEffect(()=>{
        handleUpdates()
    },[handleUpdates])

    return (
        <div className='RCH-outer-container'>
            <div className='RCH-inner-container'>
                <div className='RCH-card-container'>
                    <Card heading='Total Users' number='8' icon={ChairIcon} color='#36363C' per='24'/>
                    <Card heading='Covid Cases' number={cases.positiveCases} icon={QueryStatsIcon} color='#257EEA' per='32'/>
                    <Card heading='Recovered' number={cases.negativeCases} icon={BungalowIcon} color='#5EB562' per='12'/>
                    <Card heading='Deaths' number='363354' icon={ThermostatIcon} color='#E83A75' per='15'/>
                </div>
                <div className='RCH-card2-container'>
                    <Card2 img={Graph1}/>
                    <Card2 img={Graph2}/>
                    <Card2 img={Graph3}/>
                </div>
            </div>
        </div>
    )
}

export default RightContainerHome

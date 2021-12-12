import React from 'react'
import './Card.css'

function Card({ heading, number, icon:Icon, color, per }) {
    return (
        <div className='card-container'>
            <div className='card-container--icon-container'>
                <div className='card-container--icon-square'>
                    <div className='card-container--icon-box' style={{backgroundColor: `${color}`}}>
                        <Icon fontSize='medium' className='icon'/>
                    </div>
                </div>
                <div className='card-container--icon-text'>
                    <p>{heading}</p>
                    <h2>{number}</h2>
                </div>
            </div>

            <div className='card-container--text-container'><span>&nbsp;{per}% </span>&nbsp;than last week</div>
        </div>
    )
}

export default Card

import React from 'react'
import './Card2.css'

function Card2({img:Img}) {
    return (
        <div className='card2-container'>
            <div className='card2-img'>
                <img src={Img}/>
            </div>
        </div>
    )
}

export default Card2

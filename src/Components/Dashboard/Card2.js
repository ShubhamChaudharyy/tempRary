import React from 'react'
import './Card2.css'

function Card2({img:Img}) {
    return (
        <div className='card2-container'>
            <div className='card2-img'>
                <img src={Img}/>
            </div>
            <div className='card2-text'>
                <h2>Website Views</h2>
                <p>Last Campaign Performace</p>
            </div>
            <div style={{ height: '1px', width: '100%', backgroundColor: 'rgba(0,0,0,0.3)' }}></div>
            <div className='card2-text2'>
                <p>campaign sent 2 days ago</p>
            </div>
        </div>
    )
}

export default Card2

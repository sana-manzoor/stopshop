import React from 'react'
import im from '../assets/s.jpg';

function Footer() {
  return (
 <div style={{height:'230px',backgroundColor:'rgb(0, 0, 0)',bottom:'0px',  position: 'relative', // Can also be 'sticky' if needed
  zIndex: 1}}>
        <div className="row">
            <div className="col">
            <h6  className='hh2 m-5 text-light'>          
                <img src={im} alt="Logo" style={{ height: '55px' }} />
            </ h6>

            </div>
            <div className="col text-end text-light">
              

            </div>
        </div>
        <div className="container">
        <hr style={{color:'white'}}/>
        </div>
        <p className="text-center text-light">Copy right 2024@stop&shop.com - All Rights Reserved.</p>

    </div>
  )
}

export default Footer
import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '70vh' }}>
            <div className='border shadow p-5 lr-res' style={{ width: '400px' }}>
                <h2 className="text-center  mb-4 mt-3">SIGN <span className='lt1'>in</span> </h2>
                <form>

                    <div className="mb-3">
                        <input type="tel" id="phone" required className="form-control " placeholder="Enter your phone" />
                    </div>

                    <div className="mb-3">
                        <input type="password" id="password" className="form-control " placeholder="Enter your password" />
                    </div>
                    

                    <div className='d-flex justify-content-center'>
                        <button className='button-49' ><span>LOGIN</span></button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Login
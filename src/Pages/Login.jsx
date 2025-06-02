import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginApi } from '../services/allApis'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'


function Login() {
    const [log, setLog] = useState({
        phone: "",
        password: ""
    })

    const location = useLocation();
    const navigate = useNavigate()

    const [valp, setValp] = useState(true)
    const [valpass, setValpass] = useState(true)

    const handle = (e) => {
        const { name, value } = e.target
        if (name == 'phone') {
            if (!!value.match(/^[6-9]\d{9}$/)) {
                setLog({ ...log, [name]: value });
                setValp(true);
            } else {
                setLog({ ...log, [name]: value });
                setValp(false);
            }
        }
        else {
            if (name == 'password') {
                if (value.trim() === "") {
                    setLog({ ...log, [name]: value })
                    setValpass(false)

                }
                else {
                    setLog({ ...log, [name]: value })
                    setValpass(true)
                }
            }
        }
    }
    console.log(log)

    const handleLog = async (e) => {
        e.preventDefault()
        console.log(log)
        const { phone, password } = log
        if (!phone || !password) {
            alert("Enter phone and Password!!")
        }
        else {
            const res = await loginApi(log)
            console.log(res)
            if (res.status === 200) {
                sessionStorage.setItem("currentUser", JSON.stringify(res.data.excistingUser._id))

                setLog({ phone: "", password: "" })
                sessionStorage.setItem("token", res.data.token);
                alert("Login Successfull!!")
                setLog({ phone: "", password: "" });
                const redirectTo = location.state?.from || '/hom';
                navigate(redirectTo);

            }
            else {
                alert(res.response.data)
            }
        }
    }


    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '70vh' }}>
            <div className='border shadow p-5 lr-res' style={{ width: '400px' }}>
                <h2 className="text-center  mb-4 mt-3">SIGN <span className='lt1'>in</span> </h2>
                <form>

                    <div className="mb-3">
                        <input type="tel" id="phone" required className="form-control " placeholder="Enter your phone" name='phone' onChange={(e) => handle(e)} />
                        {
                            !valp &&
                            <div className='text-danger'>*Enter valid phone number</div>
                        }
                    </div>

                    <div className="mb-3">
                        <input type="password" id="password" className="form-control " placeholder="Enter your password" name='password' onChange={(e) => handle(e)} />
                        {
                            !valpass &&
                            <div className="text-danger">*Enter valid password</div>
                        }
                    </div>


                    <div className='d-flex justify-content-center'>
                        <button className='button-49' onClick={(e) => { handleLog(e) }} ><span>LOGIN</span></button>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default Login
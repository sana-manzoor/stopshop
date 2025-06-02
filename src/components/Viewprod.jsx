import React, { useState, useEffect } from 'react'
import { viewp } from '../services/allApis'
import { addcart } from '../services/allApis'


function Viewprod() {

    const [data, setData] = useState({})

    const [pid, setPid] = useState(null)

    const [token, setToken] = useState("")

    const getData = async () => {
        const uu = JSON.parse(sessionStorage.getItem("pid"))
        setPid(uu)
        console.log(uu)
        const uup = JSON.stringify(uu)
        console.log(uup)
        const result = await viewp(uu)
        console.log(result)
        setData(result.data[0])
        //   sessionStorage.removeItem('pid');          
    }


    const addtocart = async (item) => {
        console.log(item)
        if (!sessionStorage.getItem("currentUser")) {
            alert("Login First!!")
            navigate('/', { state: { from: '/viewprod' } })
        }
        else {
            const id = sessionStorage.getItem("currentUser")
            const idd = JSON.parse(id)
            const totall = item.price * 1
            const dataToSend = { pid: item._id, title: item.title, price: item.price, image: item.image, uid: idd, total: totall };
            const reqHeader = {
                "Authorization": `Bearer ${token} `
            }
            console.log(dataToSend)
            const res1 = await addcart(dataToSend, reqHeader)
            console.log(res1)
            if (res1.status === 200) {
                alert("Product added to cart!!")
                // navigate('/cart')
            }
            else {
                alert("Product Already excists in cart")
            }
        }
    }

    console.log(data)

    useEffect(() => {
         if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
        getData()
       
    }, [])

    return (
        <div className="container mb-5" style={{ marginTop: '80px', minHeight: '500px' }}>
            <div className="row gx-4 gx-lg-5 mb-4 align-items-center">
                <div className="  col-md-6">
                    <img className="card-img-top mb-5 mb-md-0" src={data.image} alt="..." height={'480px'} />
                </div>
                <div className="  col-md-6">
                    {/* <div className="small mb-1">Product Id: 23</div> */}
                    <h2 className="display-5 fw-bolder ht1 mb-3">{data.title}</h2>
                    <div className='mb-3' >
                        <i className="fas fa-star" style={{ color: "black" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "black" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "black" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "black" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "grey" }}></i>
                    </div>
                    <div className="fs-5 mb-4">
                        <h3 className='ht1'>₹{data.price}</h3>
                    </div>
                    <p className="lead">{data.description}</p>


                    <div className='d-flex justify-content-start'>
                        <button className='button-49 me-4' onClick={() => addtocart(data)} ><span><i className="fa-solid fa-cart-plus fa-lg"></i></span></button>
                        <button className='button-49' ><span><i className="fa-solid fa-heart fa-lg"></i></span></button>

                    </div>




                </div>


            </div>


        </div>
    )
}

export default Viewprod
import React, { useState, useEffect } from 'react'
import { viewp } from '../services/allApis'
import { addcart } from '../services/allApis'
import { addwish, getwish, addrecent } from '../services/allApis'


function Viewprod() {

    const [data, setData] = useState({})

    const [pid, setPid] = useState(null)

    const [token, setToken] = useState("")

    const [wishlistPids, setWishlistPids] = useState([]);

    const [lastv, setLastv] = useState({})


    const getData = async () => {
        const uu = JSON.parse(sessionStorage.getItem("pid"))
        setPid(uu)
        console.log(uu)
        const uup = JSON.stringify(uu)
        console.log(uup)
        const result = await viewp(uu)
        console.log(result)
        setData(result.data[0])
        setLastv(result.data[0])

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


    const addwishlist = async (item) => {
        if (!sessionStorage.getItem("currentUser")) {
            alert("Login First!!")
            navigate('/', { state: { from: '/allprod' } })
        }
        else {
            const id = sessionStorage.getItem("currentUser")
            const idd = JSON.parse(id)
            const dataToSend = { pid: item._id, title: item.title, price: item.price, image: item.image, uid: idd };
            console.log(dataToSend)
            const reqHeader = {
                "Authorization": `Bearer ${token} `
            }
            const res1 = await addwish(dataToSend, reqHeader)
            console.log(res1)
            if (res1.status === 201) {
                alert("Item added to Wishlist!!")
                setWishlistPids(prev => [...prev, item._id]);

                // navigate('/wish')
            }
            else {
                alert("Product Already excists")
            }
        }
    }


    const fetchWishlist = async () => {
        const user = sessionStorage.getItem("currentUser");
        const token = sessionStorage.getItem("token");

        if (user && token) {
            const uid = JSON.parse(user);
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };
            const res = await getwish(uid, reqHeader);
            if (res.status === 200) {
                const pids = res.data.map(item => item.pid);
                setWishlistPids(pids);
            }
        }
    };


    const getlast = async () => {
        console.log(lastv)
        const id = sessionStorage.getItem("currentUser")
        const idd = JSON.parse(id)
        const dataToSend = { pid: lastv._id, title: lastv.title, price: lastv.price, image: lastv.image, uid: idd };
        console.log(dataToSend)
           const result = await addrecent(dataToSend)
        console.log(result)

    }


    console.log(lastv)

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
            fetchWishlist()
        }
        getData()

    }, [])

    useEffect(() => {
        getlast()
    }, [lastv])

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
                        <i className="fas fa-star" style={{ color: "rgb(221, 231, 38)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "rgb(221, 231, 38)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "rgb(221, 231, 38)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "rgb(221, 231, 38)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "rgb(206, 206, 206)" }}></i>
                    </div>
                    <div className="fs-5 mb-4">
                        <h3 className='ht1'>₹{data.price}</h3>
                    </div>
                    <p className="lead">{data.description}</p>


                    <div className='d-flex justify-content-start'>
                        <button className='btn me-4' onClick={() => addtocart(data)} ><span><i className="fa-solid fa-cart-plus fa-2xl"></i></span></button>
                        <button className='btn' onClick={() => { addwishlist(data) }}><span><i className={`fa-solid fa-heart fa-2xl`} style={{ color: wishlistPids.includes(data._id) ? 'red' : 'grey' }}></i> </span></button>

                    </div>




                </div>


            </div>


        </div>
    )
}

export default Viewprod
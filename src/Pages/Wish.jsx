import React, { useState, useEffect, useContext } from 'react'
import { Card, Button } from 'react-bootstrap'
import { getwish, addcart, delwish } from '../services/allApis'
import { toast } from 'react-toastify'
import { cartResponseContext } from '../context/ContextShare'



function Wish() {

    const [data, setData] = useState([])

    const [token, setToken] = useState("")

    const { cartResponse, setCartResponse } = useContext(cartResponseContext)

    const getdata = async () => {
        const id = sessionStorage.getItem("currentUser")
        const idd = JSON.parse(id)
        const reqHeader = {
            "Authorization": `Bearer ${token} `
        }
        const result = await getwish(idd, reqHeader)
        console.log(result)
        setData(result.data)

    }

    const addtocart = async (item) => {
        console.log(item)
        if (!sessionStorage.getItem("currentUser")) {
            toast.warning("Login First!!")
            navigate('/', { state: { from: '/allprod' } })
        }
        else {
            const id = sessionStorage.getItem("currentUser")
            const idd = JSON.parse(id)
            const totall = item.price * 1
            const dataToSend = { pid: item.pid, title: item.title, price: item.price, image: item.image, uid: idd, total: totall };
            const reqHeader = {
                "Authorization": `Bearer ${token} `
            }
            console.log(dataToSend)
            const res1 = await addcart(dataToSend, reqHeader)
            console.log(res1)
            if (res1.status === 200) {
                toast.success("Product added to cart!!")
                // navigate('/cart')
                setCartResponse(res1.data)

            }
            else {
                toast.warning("Product Already excists in cart")
            }
        }
    }


    const deletewish = async (id) => {
        // console.log(id)
        const res = await delwish(id)
        console.log(res)
        if (res.status === 200) {
            getdata()
        }
    }



    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }


    }, [])


    useEffect(() => {
        if (token) {
            getdata();
        }
    }, [token]);


    return (
        <>

            <h3 className="text-center mt-2 ht2">WISHLIST</h3>

            {

                data?.length > 0 ?

                    <section className="py-5">
                        <div className="container mt-2">
                            <div className='row justify-content-start'>


                                {
                                    data?.map(item => (
                                        <div className="col-6 col-md-3 mb-4 d-flex justify-content-center">
                                            <Card style={{ width: '17rem', height: '400px' }} className='border shadow mb-2 text-center'>
                                                <Card.Img
                                                    variant="top" src={item.image} style={{ height: '230px' }} className='img-fluid' />
                                                <Card.Body>
                                                    <div id='t1' className='mb-2'><b>{item.title}</b></div>
                                                    <h5 className='mb-3'>₹{item.price}</h5>
                                                    <div className="card-footer d-flex justify-content-between">
                                                        <Button className="btn" variant="outline-dark" onClick={() => { deletewish(item._id) }}>
                                                            <i className="fa-solid fa-lg fa-heart-circle-xmark"></i>
                                                        </Button>
                                                        <Button className="btn" variant="outline-dark" onClick={() => { addtocart(item) }}>
                                                            <i className="fa-solid fa-cart-plus fa-lg"></i>
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))
                                }




                            </div>


                        </div>
                    </section>
                    :
                    (
                        <div style={{ minHeight: '400px' }}>
                            <h2 className=" text-muted m-3" >No items in the wishlist.</h2>

                        </div>
                    )}
        </>
    )
}

export default Wish
import React, { useState, useEffect, useMemo, useContext } from 'react'
import { getcart } from '../services/allApis'
import { incrcart, decrcart } from '../services/allApis'
import { cartResponseContext } from '../context/ContextShare'

function Cart() {

    const [data, setData] = useState([])

    const [token, setToken] = useState("")

    const [total, setTotal] = useState(0)

    const { cartResponse, setCartResponse } = useContext(cartResponseContext)


    const getdata = async () => {
        const id = sessionStorage.getItem("currentUser")
        const idd = JSON.parse(id)
        const reqHeader = {
            "Authorization": `Bearer ${token} `
        }
        const result = await getcart(idd, reqHeader)
        console.log(result)
        setData(result.data)
        setCartResponse(result.data)

    }

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }

    }, [])


    const increasee = async (id) => {
        const res = await incrcart(id)
        console.log(res)
        getdata()
    }

    const decreasee = async (id) => {
        const res = await decrcart(id)
        console.log(res)
        getdata()
    }

    useEffect(() => {
        if (token) {
            getdata();
        }
    }, [token]);

    useMemo(() => {
        const totalAmount = data?.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalAmount || 0);

    }, [data]);



    return (
        <>


            <div className="p-5 row gx-0" style={{ minHeight: '80vh' }}>
                {data?.length > 0 ? (
                    <div>
                        <div className="col-md-8 me-5 c-p" >
                            {/* <h2 className="text-center  m-4">cart <span className='ht2'>SUMMARY..</span> </h2> */}

                            <table className="table mt-5 table-bordered table-hover shadow  " >
                                <thead className='m-5'>
                                    <tr>
                                        <th></th>
                                        <th>Title</th>
                                        <th ></th>
                                        <th>Price</th>
                                        <th> P.Quantity</th>
                                        <th>Total Price</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {
                                        data?.map((item, index) => (
                                            <tr>
                                                <td style={{ fontSize: '10px' }}>{index + 1}</td>
                                                <td style={{ fontSize: '12px' }}>{item.title}</td>
                                                <td className='d-flex justify-content-center'>
                                                    <img src={item.image} className='c-img' alt="" />
                                                </td>

                                                <td>₹{item.price}</td>
                                                <td>
                                                    <div style={{ fontSize: '15px' }}>
                                                        <button className="btn" style={{ fontSize: '10px' }} onClick={() => { increasee(item._id) }} >+</button>
                                                        {item.quantity}
                                                        <button className="btn" style={{ fontSize: '10px' }} onClick={() => { decreasee(item._id) }} >-</button>

                                                    </div>

                                                </td>
                                                <td>{item.total}</td>
                                                <td><i className="fa-solid fa-trash fa-lg" style={{ cursor: 'pointer' }} ></i></td>


                                            </tr>

                                        ))
                                    }



                                </tbody>



                            </table>



                        </div>

                        <div className="col-md-3 ms-2">
                            <div className="card mt-5 shadow">
                                <div className=" container card-body">
                                    <h3 className="text-center  m-4">CART <span className='lt1'>summary..</span> </h3>
                                    <hr />
                                    <h5 className="card-text  ht1">
                                        <strong>Total Products:</strong> <span>{data?.length || 0}</span>
                                    </h5>

                                    <h5 className=" card-text ht1">
                                        <strong>Total Amount:</strong> ₹{total || 0}
                                    </h5>




                                    <div className="d-flex justify-content-center  py-3">
                                        <button className="button-49" >
                                            <span> Proceed to Checkout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                )
                :
                    (
                        <h2 className="m-3 text-muted">No items in the cart.</h2>
                    )}


            </div>






        </>
    )
}

export default Cart
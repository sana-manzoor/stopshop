import React, { useState, useEffect, useContext } from 'react'
import { viewp } from '../services/allApis'
import { addcart } from '../services/allApis'
import { addwish, getwish, addrecent } from '../services/allApis'
import { toast } from 'react-toastify'
import { cartResponseContext } from '../context/ContextShare'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom'



function View() {

    const [data, setData] = useState({})

    const [pid, setPid] = useState(null)

    const [token, setToken] = useState("")

    const [wishlistPids, setWishlistPids] = useState([]);

    const [lastv, setLastv] = useState({})

    const location = useLocation();

    const { cartResponse, setCartResponse } = useContext(cartResponseContext)

    const navigate = useNavigate()

    const { pidd } = useParams();

    const [loading, setLoading] = useState(false);


    const getData = async () => {
        setLoading(true);
        try {
            const result = await viewp(pidd);
            console.log(result);

            if (result?.status === 200 && result?.data?.length > 0) {
                const product = result.data[0];
                setData(product);
                setLastv(product);
                getlast(product);
            } else {
                toast.error("Product not found");
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            toast.error("Failed to fetch product");
        }
        finally {
            setLoading(false);
        }
    };



    const addtocart = async (item) => {
        console.log(item)
        if (!sessionStorage.getItem("currentUser")) {
            toast.warning("Login First!!")
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
                toast.success("Product added to cart!!")
                setCartResponse(res1.data)

                // navigate('/cart')
            }
            else {
                toast.warning("Product Already excists in cart")
            }
        }
    }


    const addwishlist = async (item) => {
        if (!sessionStorage.getItem("currentUser")) {
            toast.warning("Login First!!")
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
                toast.success("Item added to Wishlist!!")
                setWishlistPids(prev => [...prev, item._id]);

                // navigate('/wish')
            }
            else {
                toast.warning("Product Already excists")
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


    const getlast = async (product) => {
        const id = sessionStorage.getItem("currentUser");
        if (!id || !product?._id) return;

        const uid = JSON.parse(id);
        const dataToSend = {
            pid: product._id,
            title: product.title,
            price: product.price,
            image: product.image,
            uid: uid,
        };

        try {
            const result = await addrecent(dataToSend);
            console.log("Recent added:", result);
        } catch (error) {
            console.error("Failed to add recent:", error);
        }
    };


    console.log(lastv)
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"));
            fetchWishlist();
        }
        getData();
    }, [pidd]);

    useEffect(() => {
        getlast()
    }, [lastv])

    return (
        <div className="container mb-5" style={{ marginTop: '80px', minHeight: '500px' }}>
             {loading ? (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status" style={{ width: '5rem', height: '5rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ) : (
            <div className="row gx-4 gx-lg-5 mb-4 align-items-center">
                <div className="  col-md-6">
                    <img className="card-img-top mb-5 mb-md-0" src={data?.image} alt="..." height={'480px'} />
                </div>
                <div className="  col-md-6">
                    {/* <div className="small mb-1">Product Id: 23</div> */}
                    <h2 className="display-5 fw-bolder ht1 mb-3">{data?.title}</h2>
                    <div className='mb-3' >
                        <i className="fas fa-star" style={{ color: "rgb(221, 231, 38)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "rgb(221, 231, 38)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "rgb(221, 231, 38)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "rgb(221, 231, 38)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "rgb(206, 206, 206)" }}></i>
                    </div>
                    <div className="fs-5 mb-4">
                        <h3 className='ht1'>₹{data?.price}</h3>
                    </div>
                    <p className="lead">{data?.description}</p>


                    <div className='d-flex justify-content-start'>
                        <button className='btn me-4' onClick={() => addtocart(data)} ><span><i className="fa-solid fa-cart-plus fa-2xl"></i></span></button>
                        <button className='btn' onClick={() => { addwishlist(data) }}><span><i className={`fa-solid fa-heart fa-2xl`} style={{ color: wishlistPids.includes(data._id) ? 'red' : 'grey' }}></i> </span></button>

                    </div>




                </div>


            </div>
    )}


        </div>
    )
}

export default View
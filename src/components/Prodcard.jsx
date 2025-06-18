import React,{useState,useEffect} from 'react'
import './prod.css'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function Prodcard({data}) {
  console.log(data)

  const navigate=useNavigate()

  const handle = async (id) => {
    console.log(id)
    navigate(`/view/${id}`);
  }

  
    // const fetchWishlist = async () => {
    //   const user = sessionStorage.getItem("currentUser");
    //   const token = sessionStorage.getItem("token");
  
    //   if (user && token) {
    //     const uid = JSON.parse(user);
    //     const reqHeader = {
    //       "Authorization": `Bearer ${token}`
    //     };
    //     const res = await getwish(uid, reqHeader);
    //     if (res.status === 200) {
    //       const pids = res.data.map(item => item.pid);
    //       setWishlistPids(pids);
    //     }
    //   }
    // };

  return (
     <div>
            <div class="product-cardd ms-2 me-2">
              <img src={data.image}    onClick={() => handle(data.pid || data._id || data._pid)}  alt="Product Image" className="product-image" />
                <div class="product-info">
                    <h3 class="product-title">{data.title}</h3>
                    <p class="product-price">₹{data.price}</p>
                      {/* <button className='btn btn-outline-dark' onClick={() => addwishlist(item)} >
                            <i className={`fa-solid fa-heart fa-lg`} style={{ color: wishlistPids.includes(item._id) ? 'red' : 'grey' }}></i>
                          </button> */}
                </div>
            </div>

            


        </div>
  )
}

export default Prodcard
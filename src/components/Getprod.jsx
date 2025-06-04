import React, { useEffect, useState,useContext } from 'react'
import { getsprod, getcprod } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { addcart } from '../services/allApis';
import { addwish, getwish } from '../services/allApis';
import { toast } from 'react-toastify'
import { cartResponseContext } from '../context/ContextShare';


function Getprod() {


  const [isVisible, setIsVisible] = useState(false);

  const [allp, setAllp] = useState([])

  const [allps, setAllps] = useState([])

  const [defaultSubcategory, setDefaultSubcategory] = useState(null);

  const navigate = useNavigate()

  const [checkedCategories, setCheckedCategories] = useState([]);

  const [sid, setSid] = useState(null);

  const [cid, setCid] = useState(sessionStorage.getItem('cid'));

  const [token, setToken] = useState("")

  const [wishlistPids, setWishlistPids] = useState([]);

      const {cartResponse,setCartResponse}=useContext(cartResponseContext)


const allpr = async () => {
  const sidFromStorage = sessionStorage.getItem("sid");
  console.log("Session sid:", sidFromStorage);

  if (sidFromStorage) {
    const parsedSid = JSON.parse(sidFromStorage);
    const result = await getsprod(parsedSid);
    console.log("Fetched from getsprod:", result);

    if (result?.data?.length > 0) {
      const firstProduct = result.data[0];
      console.log("First product:", firstProduct);

      setAllp(result.data);
      setCid(firstProduct.cid || "MISSING_CID");  // fallback log value
      setDefaultSubcategory(firstProduct.sname);
      setCheckedCategories([firstProduct.sname]);
    } else {
      console.warn("No product data returned from getsprod");
    }
  } else {
    console.warn("No sid found in sessionStorage");
  }
};


  console.log(cid)

  const allprs = async () => {
    const results = await getcprod(cid)
    console.log(results)
    setAllps(results.data)
  }

  const handleCategoryChange = (e, sname) => {
    if (e.target.checked) {
      setCheckedCategories(prev => [...prev, sname]);
    } else {
      setCheckedCategories(prev => prev.filter(name => name !== sname));
    }
  };

  const filteredProducts = checkedCategories.length === 0
    ? allps
    : allps.filter(item => checkedCategories.includes(item.sname));


  const handle = async (id) => {
    console.log(id)
       navigate(`/view/${id}`);

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



  useEffect(() => {
    allpr()
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
      fetchWishlist()
    }
  }, [])




  useEffect(() => {
    if (cid !== null) {
      allprs();
    }
  }, []);

  console.log(allps)


  console.log(allp)
  return (
    <div className="container mb-5" style={{ minHeight: '400px' }}>

      <div className="container mt-5 mb-4">

      </div>

      <div className="row">

        {/* Button to toggle visibility on small screens */}
        <button
          className="custom-toggle-button d-block d-md-none mb-3"
          onClick={() => setIsVisible(prev => !prev)}
        >
          {isVisible ? (
            <>
              Filters <i className="fa-solid fa-caret-up" style={{ color: '#a21127' }}></i>
            </>
          ) : (
            <>
              Filters <i className="fa-solid fa-caret-down" style={{ color: '#a21127' }}></i>
            </>
          )}
        </button>


        <div className={`col-12 col-md-3 ${isVisible ? '' : 'd-none d-md-block'}`}>
          <div className="border p-3 shadow-sm rounded mb-4">
            <h4 className="text-center mb-3">FILTERS</h4>
            <div className="mb-3">
              <form>
                <label htmlFor="category" className="p-2"><b>SUB CATEGORIES</b></label><br />
                <input type="checkbox" checked={checkedCategories.length === 0} onChange={() =>{ setCheckedCategories([]);allprs()}}
                /> All                <br />
                {
                  [...new Map(allps.map(item => [item.sname, item])).values()].map(item => (
                    <div key={item.sname}>
                      <input
                        type="checkbox"
                        name={item.sname}
                        checked={checkedCategories.includes(item.sname)}
                        onChange={(e) => handleCategoryChange(e, item.sname)}
                      />
                      {item.sname}
                      <br />
                    </div>
                  ))
                }

              </form>
            </div>



          </div>
        </div>


        <div className="col-12 col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="ht1" style={{ display: 'inline' }}>
              All <span className="ht2">COLLECTIONS</span>
            </h2>
          </div>


          <div>
            <div className="row">
              {
                (filteredProducts.length > 0 ? filteredProducts : allp)?.map((item) => (
                  <div key='' className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <div className="product-card shadow-sm rounded">
                      <img
                        src={item.image}
                        alt="Product"
                        onClick={() => handle(item._id)}
                        className="product-image rounded-top"
                      />
                      <div className="product-info p-2">
                        <h2 className="product-title mb-2 ht1">{item.title}</h2>
                        <p className="product-price ht1 fw-bold">{item.price}</p>
                        <div className="d-flex justify-content-evenly ">

                          <button className='btn btn-outline-dark' onClick={() => { addtocart(item) }} >
                            <span><i className="fa-solid fa-cart-plus fa-lg"></i></span>
                          </button>
                          <button className='btn btn-outline-dark' onClick={() => addwishlist(item)} >
                            <i className={`fa-solid fa-heart fa-lg`} style={{ color: wishlistPids.includes(item._id) ? 'red' : 'grey' }}></i>
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>

                ))
              }


            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Getprod
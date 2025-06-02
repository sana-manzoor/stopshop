import React, { useEffect, useState } from 'react'
import { getsprod, getcprod } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { addcart } from '../services/allApis';

function Getprod() {


  const [isVisible, setIsVisible] = useState(false);

  const [allp, setAllp] = useState([])

  const [allps, setAllps] = useState([])

  const [defaultSubcategory, setDefaultSubcategory] = useState(null);

  const navigate=useNavigate()

  const [checkedCategories, setCheckedCategories] = useState([]);

  const [sid, setSid] = useState(null);

  const [cid, setCid] = useState(null);

  const [token,setToken]=useState("")




  const allpr = async () => {
    if (sessionStorage.getItem("sid")) {
      const uu = JSON.parse(sessionStorage.getItem("sid"))
      setSid(uu)
      console.log(uu)
      const result = await getsprod(uu)
      console.log(result.data[0].cid)
      setAllp(result.data)
      setCid(result.data[0].cid);
      console.log(cid)
      setDefaultSubcategory(result.data[0].sname);
      setCheckedCategories([result.data[0].sname]);
      // sessionStorage.removeItem('sid');
    }
    else {
      const result = await getsprod(sid)
      console.log(result)
      setAllp(result.data)
      setCid(result.data[0].cid);
      setDefaultSubcategory(result.data[0].sname);
      setCheckedCategories([result.data[0].sname]);
    }
  }

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
    sessionStorage.setItem("pid", JSON.stringify(id))
    navigate('/viewprod')
  }



  const addtocart = async (item) => {
      console.log(item)
      if (!sessionStorage.getItem("currentUser")) {
        alert("Login First!!")
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
        const res1 = await addcart(dataToSend,reqHeader)
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
  
  
    useEffect(() => {
      allpr()
      if (sessionStorage.getItem("token")) {
        setToken(sessionStorage.getItem("token"))
      }
    }, [])
  

 

  useEffect(() => {
    if (cid !== null) {
      allprs();
    }
  }, [cid]);

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
                <input type="checkbox" checked={checkedCategories.length === 0} onChange={() => setCheckedCategories([])}
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
                        onClick={()=>handle(item._id)}
                        className="product-image rounded-top"
                      />
                      <div className="product-info p-2">
                        <h2 className="product-title mb-2 ht1">{item.title}</h2>
                        <p className="product-price ht1 fw-bold">{item.price}</p>
                        <div className="d-flex justify-content-evenly ">

                          <button className='btn btn-outline-dark' onClick={() => { addtocart(item) }} >
                            <span><i className="fa-solid fa-cart-plus fa-lg"></i></span>
                          </button>
                          <button className='btn btn-outline-dark' >
                            <span><i className="fa-solid fa-heart fa-lg"></i></span>
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
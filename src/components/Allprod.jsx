import React, { useEffect, useState } from 'react'
import { getcprod } from '../services/allApis';

function Allprod() {

  const [isVisible, setIsVisible] = useState(false);

  const [allp, setAllp] = useState([])

  const [checkedCategories, setCheckedCategories] = useState([]);

   const [cid, setCid] = useState(null);



  const allpr = async () => {
    if(sessionStorage.getItem("cid")){
      const uu = JSON.parse(sessionStorage.getItem("cid"))
      setCid(uu)
      console.log(uu)
      const result = await getcprod(uu)
      console.log(result)
      setAllp(result.data)
      sessionStorage.removeItem('cid');
    }
    else{
       const result = await getcprod(cid)
      console.log(result)
      setAllp(result.data)
    }


  }

  const handleCategoryChange = (e, sname) => {
    if (e.target.checked) {
      setCheckedCategories(prev => [...prev, sname]);
    } else {
      setCheckedCategories(prev => prev.filter(name => name !== sname));
    }
  };

  const filteredProducts = checkedCategories.length === 0
    ? allp
    : allp.filter(item => checkedCategories.includes(item.sname));



  useEffect(() => {
    allpr()
  }, [])

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
                <input type="checkbox" defaultChecked onClick={() => allpr()} checked={checkedCategories.length === 0} onChange={() => setCheckedCategories([])} />All

                <br />
                {
                  [...new Map(allp.map(item => [item.sname, item])).values()].map(item => (
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

                        className="product-image rounded-top"
                      />
                      <div className="product-info p-2">
                        <h2 className="product-title mb-2 ht1">{item.title}</h2>
                        <p className="product-price ht1 fw-bold">{item.price}</p>
                        <div className="d-flex justify-content-evenly ">

                          <button className='btn btn-outline-dark' >
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

export default Allprod
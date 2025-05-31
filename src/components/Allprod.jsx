import React,{useState} from 'react'

function Allprod() {

      const [isVisible, setIsVisible] = useState(false);

  return (
     <div className="container mb-5" style={{  minHeight: '400px' }}>

      <div className="container mt-5 mb-4">
        
      </div>

      <div className="row">

        {/* Button to toggle visibility on small screens */}
        <button className="custom-toggle-button d-block d-md-none mb-3" >
          {isVisible ?
            <>

              Filters <i className="fa-solid fa-caret-down " style={{ color: '#a21127' }}></i>

            </>
            :
            <>
              Filters <i className="fa-solid fa-caret-down " style={{ color: '#a21127' }}></i>
            </>}
        </button>


        <div className={`col-12 col-md-3 ${isVisible ? '' : 'd-none d-md-block'}`}>
          <div className="border p-3 shadow-sm rounded mb-4">
            <h4 className="text-center mb-3">FILTERS</h4>
            <div className="mb-3">
              <form>
                <label htmlFor="category" className="p-2"><b>CATEGORIES</b></label>
                <br />
                <input type="checkbox" name="men"  /> MEN <br />
                <input type="checkbox" name="women"  /> WOMEN <br />
                <input type="checkbox" name="kids"  /> KIDS <br />
              </form>
            </div>

            <div>
              <form>
                <label htmlFor="category" className="p-2"><b>TYPE</b></label>
                <br />
                  <div >
                    <input
                      type="checkbox"
                      name=''
                    /> hii <br />
                  </div>
                
                  <div >
                    <input
                      type="checkbox"
                      name=''
                    /> helo <br />
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name=''
                    /> hoii <br />
                  </div>
             
              </form>
            </div>
          </div>
        </div>


        <div className="col-12 col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="ht1" style={{ display: 'inline' }}>
              All <span className="ht2">COLLECTIONS</span>
            </h2>
            <span className="text-end">
              <select className="form-select text-sm px-3 border-2 border-gray-300" >
                <option disabled value="relevant">Sort by: </option>
                <option value="low-high">---Low to High---</option>
                <option value="high-low">---High to Low---</option>
              </select>
            </span>
          </div>


          <div>
            <div className="row">
                <div key='' className="col-6 col-sm-6 col-md-4 col-lg-3 mb-4">
                  <div className="product-card shadow-sm rounded">
                    <img
                      src="https://th.bing.com/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?w=6000&h=2848&rs=1&pid=ImgDetMain"
                      alt="Product"
                    
                      className="product-image rounded-top"
                    />
                    <div className="product-info p-2">
                      <h2 className="product-title mb-2 ht1">shoes</h2>
                      <p className="product-price ht1 fw-bold">899</p>
                      <div className="d-flex justify-content-evenly ">
                      <select id="size" className="form-select m-1" >
                        <option value="" selected disabled>--Select Size--</option>
                        <option value="S">Small (S)</option>
                        <option value="M">Medium (M)</option>
                        <option value="L">Large (L)</option>
                        <option value="XL">Extra Large (XL)</option>
                        {/* {item.size.map((size) => (
                          <option key={size} value={size}>
                            {size === "S"
                              ? "Small (S)"
                              : size === "M"
                                ? "Medium (M)"
                                : size === "L"
                                  ? "Large (L)"
                                  : size === "XL"
                                    ? "Extra Large (XL)"
                                    : size}
                          </option>
                        ))} */}
                      </select>

                      <button className='btn btn-outline-dark' >
                        <span><i className="fa-solid fa-cart-plus fa-lg"></i></span>
                      </button>
                      </div>
                     
                    </div>
                  </div>
                </div>
              
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Allprod
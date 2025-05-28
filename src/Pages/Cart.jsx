import React from 'react'

function Cart() {
  return (
     <>
     
           

                    <div className="p-5 row gx-0" style={{ minHeight: '80vh' }}>
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

                                   
                                            <tr>
                                                <td  style={{fontSize:'10px'}}>1</td>
                                                <td style={{fontSize:'12px'}}>dress</td>
                                                <td className='d-flex justify-content-center'>
                                                    <img src='https://th.bing.com/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain' className='c-img' alt="" />
                                                </td>
                                            
                                                <td>rs 23</td>
                                                <td>
                                                    <div  style={{fontSize:'15px'}}>
                                                        <button className="btn"  style={{fontSize:'10px'}}  >+</button>
                                                        6
                                                        <button className="btn"  style={{fontSize:'10px'}}  >-</button>

                                                    </div>

                                                </td>
                                                <td>566</td>

                                                <td><i className="fa-solid fa-trash fa-lg" style={{ cursor: 'pointer' }} ></i></td>
                                            </tr>


                                    
                                </tbody>



                            </table>



                        </div>

                        <div className="col-md-3 ms-2">
                            <div className="card mt-5 shadow">
                                <div className=" container card-body">
                                    <h3 className="text-center  m-4">CART <span className='lt1'>summary..</span> </h3>
                                    <hr />
                                    <h5 className="card-text  ">
                                        <strong>Total Products:</strong> 
                                    </h5>
                                    
                                        <h5 className=" card-text ">
                                            <strong>Total Amount:</strong> 999
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
                    




          
        </>
  )
}

export default Cart
import React from 'react'

function View() {
    return (
        <div className="container mb-5" style={{ marginTop: '80px', minHeight: '500px' }}>
            <div className="row gx-4 gx-lg-5 mb-4 align-items-center">
                <div className="  col-md-6">
                    <img className="card-img-top mb-5 mb-md-0" src='https://th.bing.com/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain' alt="..." height={'480px'} />
                </div>
                <div className="  col-md-6">
                    {/* <div className="small mb-1">Product Id: 23</div> */}
                    <h2 className="display-5 fw-bolder ht1 mb-3">Adipoli Shoes</h2>
                    <div className='mb-3' >
                        <i className="fas fa-star" style={{ color: "rgb(221, 231, 38)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "rgb(221, 231, 38)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "rgb(221, 231, 38)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "rgb(221, 231, 38)" }}></i>
                        <i className="fas fa-star ms-2" style={{ color: "rgb(206, 206, 206)" }}></i>
                    </div>
                    <div className="fs-5 mb-4">
                        <h3 className='ht1'>₹1234</h3>
                    </div>
                    <p className="lead">hahha hjjksdf ksfjdksjd djfnsdn sdjfbsdfn djf dfjhdf djbhdj dhbjdsf dfhjbdfd fhdbfd fhdsbfd fdjds</p>


                    <div className='d-flex justify-content-start'>
                        <button className='button-49' ><span> <i className="fa-solid fa-cart-plus fa-lg"></i></span></button>
                        <button className='ms-4 button-49' ><span><i className="fa-solid fa-heart fa-lg"></i></span></button>

                    </div>




                </div>


            </div>



        </div>
    )
}

export default View
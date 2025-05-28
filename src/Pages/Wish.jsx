import React from 'react'
import { Card, Button } from 'react-bootstrap'

function Wish() {
    return (
        <>
            <h3 className="text-center mt-2 ht2">WISHLIST</h3>
            <section className="py-5">
                <div className="container mt-2">
                    <div className='row justify-content-start'>
                        <div className="col-6 col-md-3 mb-4 d-flex justify-content-center">
                            <Card style={{ width: '20rem', height: '420px' }} className='border shadow mb-2 text-center'>
                                <Card.Img
                                    variant="top" src='https://th.bing.com/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain' style={{ height: '230px' }} className='img-fluid' />
                                <Card.Body>
                                    <div id='t1' className='mb-2'><b>bags</b></div>
                                    <h5 className='mb-3'>Price:₹3455</h5>
                                    <div className="card-footer d-flex justify-content-between">
                                        <Button className="btn" variant="outline-dark">
                                            <i className="fa-solid fa-lg fa-heart-circle-xmark"></i>
                                        </Button>
                                        <Button className="btn" variant="outline-dark">
                                            <i className="fa-solid fa-cart-plus fa-lg"></i>
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>

                        

                    </div>


                </div>
            </section>
        </>
    )
}

export default Wish
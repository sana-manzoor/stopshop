import React, { useRef } from 'react'
import './homes.css';
import { Container, Button, Carousel } from 'react-bootstrap';
import Prodcard from '../components/Prodcard';

function Homes() {

    const scrollRef = useRef(null);

    const scrollRef2 = useRef(null);

    const categories = [
        "Electronics", "Men's Fashion", "Women's Fashion", "Kids' Fashion",
        "Home & Kitchen", "Beauty & Fragrance", "Baby", "Toys", "Sports & Outdoors"
    ];


    const deals = [
        { name: "grocery", image: "https://wallpapers.com/images/hd/fresh-produce-grocery-png-14-6heczpnd7ui86tst.png" },
        { name: "traditional wear", image: "https://png.pngtree.com/png-clipart/20231109/original/pngtree-smart-indian-family-of-four-in-ethnic-wear-holding-diwali-gifts-png-image_13523818.png" },
        { name: "electronics", image: "https://www.pngarts.com/files/4/Electronic-PNG-Download-Image.png" },
        { name: "mobiles", image: "https://pngimg.com/uploads/iphone_14/iphone_14_PNG21.png" },
        { name: "beauty", image: "https://www.pngmart.com/files/17/Cosmetics-Product-Transparent-Background.png" },
        { name: "watches", image: "https://th.bing.com/th/id/R.9d4e86716bba881181b3ceaa7c2708fb?rik=8aD1MvBdszAXHA&riu=http%3a%2f%2fpngimg.com%2fuploads%2fwatches%2fwatches_PNG101435.png&ehk=XuYpOXqXVs3a1oTaUpOfo%2bFWutP6pIXELO6IuURQxbk%3d&risl=&pid=ImgRaw&r=0" },
        { name: "stationary", image: "https://i.pinimg.com/originals/14/bc/8b/14bc8b724f67af4c00a5c43369dffe5a.png" },
        { name: "baby", image: "https://www.pngarts.com/files/1/Baby-Items-PNG-Image-with-Transparent-Background.png" },
        { name: "sports", image: "https://www.pngmart.com/files/3/Sport-PNG-Picture.png" },
        { name: "men's fashion", image: "https://pluspng.com/img-png/men-clothes-png-polo-shirt-png-image-1000.png" },
        { name: "women's fashion", image: "https://purepng.com/public/uploads/large/purepng.com-women-dressclothingwomen-dressfashion-women-dress-cloth-apparel-631522326975ia8xr.png" },


    ]

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -150 : 150;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const scrolld = (direction) => {
        const container = scrollRef2.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -150 : 150;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };


    return (
        <div style={{ minHeight: '100vh' }}>
            <div className="bg-white  py-2 position-relative">

                {/*-----categories--------*/}
                <Container className="d-flex align-items-center">
                    <span onClick={() => scroll('left')} className="me-2" style={{ cursor: 'pointer' }}>
                        <i class="fa-solid fa-less-than fa-md" style={{ color: ' #000000' }}></i>
                    </span>

                    <div
                        ref={scrollRef}
                        className="scroll-container d-flex gap-3"
                        style={{
                            overflowX: 'auto',
                            whiteSpace: 'nowrap',
                            flexWrap: 'nowrap',
                            scrollBehavior: 'smooth',
                            width: '100%',
                        }}
                    >
                        {categories.map((cat, index) => (
                            <div
                                key={index}
                                className="px-3 py-2 text-nowrap tt "
                                style={{ cursor: 'pointer', minWidth: 'max-content' }}
                            >
                                {cat}
                            </div>
                        ))}
                    </div>

                    <span onClick={() => scroll('right')} className="ms-2" style={{ cursor: 'pointer' }}>
                        <i class="fa-solid fa-greater-than fa-md" style={{ color: ' #000000' }}></i>
                    </span>
                </Container>



                {/*-----carousel-----*/}
                <Carousel className='mt-3 mb-3'>
                    <Carousel.Item>
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/000a3e161286933.63c2ab4d58686.jpg" alt="" style={{ height: '350px', width: '100%', objectFit: 'cover' }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="https://static.vecteezy.com/system/resources/previews/006/549/978/original/weekly-sale-banner-design-template-sale-background-design-special-offer-promotion-discount-banner-free-vector.jpg" alt="" style={{ height: '350px', width: '100%', objectFit: 'cover' }} />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/8f69a6161286933.63c2ab4c9240f.jpg" alt="" style={{ height: '350px', width: '100%', objectFit: 'cover' }} />
                    </Carousel.Item>
                </Carousel>



                {/* --------deals--------- */}

                <Container className="d-flex align-items-center mt-5">
                    <span onClick={() => scrolld('left')} className="me-2" style={{ cursor: 'pointer' }}>
                        <i class="fa-solid fa-less-than fa-md" style={{ color: ' #000000' }}></i>
                    </span>

                    <div
                        ref={scrollRef2}
                        className="scroll-container d-flex"
                        style={{
                            overflowX: 'auto',
                            whiteSpace: 'nowrap',
                            flexWrap: 'nowrap',
                            scrollBehavior: 'smooth',
                            width: '100%',
                        }}
                    >
                        {deals.map((deal, index) => (
                            <div className='ms-3 me-3'>
                                <img src={deal.image} alt="category" className="" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                                <h6 className='text-center'>{deal.name}</h6>

                            </div>

                        ))}
                    </div>

                    <span onClick={() => scrolld('right')} className="ms-2" style={{ cursor: 'pointer' }}>
                        <i class="fa-solid fa-greater-than fa-md" style={{ color: ' #000000' }}></i>
                    </span>
                </Container>




                {/* ----------recently viewed produvts-------- */}

                <h3 className="text-start ht1 container mb-4 mt-5">RECENTLY <span className='lt1'> viewed</span> </h3>
                <div className=' container d-flex justify-content-between dd mb-4'>

                    <Prodcard />

                </div>




                {/* ---------recommended--------- */}
                <h3 className="text-start ht1 container mb-4 mt-5">RECOMMENDED <span className='lt1'> for you..</span> </h3>
                <div className=' container d-flex justify-content-between dd mb-4'>

                    <Prodcard />

                </div>


            </div>
        </div>


    )
}

export default Homes
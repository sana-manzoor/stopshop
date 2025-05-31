import React, { useRef, useState, useEffect } from 'react'
import './homes.css';
import { Container, Button, Carousel } from 'react-bootstrap';
import Prodcard from '../components/Prodcard';
import Dropdown from 'react-bootstrap/Dropdown';
import { getallcat, getallsub } from '../services/allApis';

function Homes() {

    const [openIndex, setOpenIndex] = useState(null);

    const [categories, setCategories] = useState([])

    const [subcat, setSubcat] = useState([])


    const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
    const containerRef = useRef(null);

    const toggleRefs = useRef([]);


    const openMenu = (idx) => {
        if (idx === openIndex) {
            setOpenIndex(null);
            return;
        }

        const toggleRect = toggleRefs.current[idx].getBoundingClientRect();

        // Calculate menu position relative to viewport
        setMenuPos({
            top: toggleRect.bottom + window.scrollY,
            left: toggleRect.left + window.scrollX,
        });

        setOpenIndex(idx);
    };


    const scrollRef2 = useRef(null);

    const closeMenu = () => setOpenIndex(null);

    const scroll = (direction) => {
        const container = containerRef.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -150 : 150;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };


    const getallcats = async () => {
        const result = await getallcat()
        console.log(result)
        setCategories(result.data)
    }

    const getsubcat = async (id) => {
        const result = await getallsub(id)
        console.log(result)
        setSubcat(result.data)

    }




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



    const scrolld = (direction) => {
        const container = scrollRef2.current;
        if (container) {
            const scrollAmount = direction === 'left' ? -150 : 150;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };


    const getss = (id) => {
        console.log("inside gets", id)

    }


    // useEffect(() => {
    //     getallcats();
    //     function onClickOutside(event) {
    //         if (
    //             containerRef.current &&
    //             !containerRef.current.contains(event.target)
    //         ) {
    //             closeMenu();
    //         }
    //     }
    //     document.addEventListener("mousedown", onClickOutside);
    //     return () => document.removeEventListener("mousedown", onClickOutside);

    // }, []);


    const popupRef = useRef(null);

    useEffect(() => {
        getallcats();
        function onClickOutside(event) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target) &&
                popupRef.current &&
                !popupRef.current.contains(event.target)
            ) {
                closeMenu();
            }
        }
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);


    return (


        <>
            {/*-----categories--------*/}

            <Container className="d-flex align-items-center">
                <span onClick={() => scroll('left')} className="me-2" style={{ cursor: 'pointer' }}>
                    <i className="fa-solid fa-less-than fa-md" style={{ color: ' #000000' }}></i>
                </span>




                {/* ---------- */}
                <div className='container'
                    ref={containerRef}
                    style={{
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                        display: "flex",
                    }}
                >
                    {/* <span onClick={() => scroll('left')}
  style={{
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
  }}>
                        <i className="fa-solid fa-less-than fa-md" style={{ color: ' #000000' }}></i>
                    </span> */}

                    {categories.map((cat, i) => (
                        <span
                            key={i}
                            ref={(el) => (toggleRefs.current[i] = el)}
                            style={{
                                whiteSpace: "nowrap",
                                cursor: "pointer",
                                fontSize: '22px'
                            }}
                            className='ms-2 me-5'
                            onClick={() => { openMenu(i); getsubcat(cat.cid) }}
                        >
                            {cat.cname}
                        </span>
                    ))}

                    {/* <span onClick={() => scroll('left')}
  style={{
    cursor: 'pointer',
    userSelect: 'none',
    fontSize: '20px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
  }}>
                        <i className="fa-solid fa-greater-than fa-md" style={{ color: ' #000000' }}></i>
                    </span> */}
                </div>

                {openIndex !== null && (
                    <div className='responsive'
                        style={{
                            position: "absolute",
                            top: menuPos.top,
                            left: menuPos.left,
                            background: "white",
                            border: "1px solid #ccc",
                            boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
                            zIndex: 9999,
                            width: '200px'

                        }}
                    >
                          <div
                            style={{ padding: "8px", cursor: "pointer"}}
                            onClick={() => getss(openIndex !== null ? categories[openIndex].cid : null)}
                        >
                            All
                        </div>
                        {subcat.map((sub, id) => (
                            <React.Fragment key={`${sub.cid}-${id}`}>
                                <div

                                    style={{ padding: "8px", cursor: "pointer" }}
                                    onClick={() => alert(sub.sname)} // or navigate/use the id
                                >
                                    {sub.sname}
                                </div>
                                {/* <div
                            style={{ padding: "8px", cursor: "pointer" }}
                            onClick={()=>getss(sub.cid)}
                        >
                            All
                        </div> */}
                            </React.Fragment>
                        ))}
                      


                    </div>
                )}







                {/* --------- */}



                <span onClick={() => scroll('right')} className="ms-2" style={{ cursor: 'pointer' }}>
                    <i className="fa-solid fa-greater-than fa-md" style={{ color: ' #000000' }}></i>
                </span>
            </Container>


















            {/* <Container className="d-flex align-items-center">
                    <span onClick={() => scroll('left')} className="me-2" style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-less-than fa-md" style={{ color: ' #000000' }}></i>
                    </span>

                    <div
                        ref={scrollRef}
                        className="scroll-container d-flex gap-3"
                    >
                      {categories.map((cat, index) => (
    <div key={index} className="category-wrapper">
      <div className="dropdown-wrapper" style={{ minWidth: 'max-content' }}>
        <button className="btn btn-outline-primary px-3 py-2 tt">
          {cat}
        </button>

        <div className="dropdown-content">
          {sampleSubcategories.map((sub, i) => (
            <div key={i} className="dropdown-item">
              {sub}
            </div>
          ))}
        </div>
      </div>
    </div>
  ))}
                    </div>

                    <span onClick={() => scroll('right')} className="ms-2" style={{ cursor: 'pointer' }}>
                        <i className="fa-solid fa-greater-than fa-md" style={{ color: ' #000000' }}></i>
                    </span>
                </Container> */}



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
                    <i className="fa-solid fa-less-than fa-md" style={{ color: ' #000000' }}></i>
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
                    <i className="fa-solid fa-greater-than fa-md" style={{ color: ' #000000' }}></i>
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



        </>


    )
}

export default Homes
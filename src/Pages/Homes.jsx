import React, { useRef, useState, useEffect } from 'react'
import './homes.css';
import { Container, Button, Carousel } from 'react-bootstrap';
import Prodcard from '../components/Prodcard';
import Dropdown from 'react-bootstrap/Dropdown';
import { getallcat, getallsub } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { getrecom, getrecent } from '../services/allApis';
import { useLocation } from 'react-router-dom';

function Homes() {

    const [openIndex, setOpenIndex] = useState(null);

    const [categories, setCategories] = useState([])

    const [subcat, setSubcat] = useState([])

    const [recom, setRecom] = useState([])

    const [recent, setRecent] = useState([])

    const navigate = useNavigate()

    const location = useLocation();

    const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

    const containerRef = useRef(null);


    const toggleRefs = useRef([]);


    const openMenu = (idx) => {
        if (idx === openIndex) {
            setOpenIndex(null);
            return;
        }

        const toggleRect = toggleRefs.current[idx].getBoundingClientRect();

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


    const getss = (id, cname) => {
        console.log("inside gets", id)
        sessionStorage.setItem("cid", JSON.stringify(id))
        navigate(`/allprod/${cname}`)


    }


    const getsubb = (data) => {
        console.log(data)

        sessionStorage.setItem("sid", JSON.stringify(data.sid))
        sessionStorage.setItem("cid", JSON.stringify(data.cid))

        navigate(`/getprod/${data.cname}`)

    }


    const getrecomm = async () => {
        const result = await getrecom()
        console.log(result)
        setRecom(result.data)
    }

    const getrecentss = async () => {
        const id = sessionStorage.getItem("currentUser")
        const idd = JSON.parse(id)
        const result = await getrecent(idd)
        console.log(result)
        setRecent(result.data)
    }






    const popupRef = useRef(null);

    useEffect(() => {
        const navType = window.performance.getEntriesByType("navigation")[0]?.type;

        if (navType === "back_forward") {
            console.log("Back/forward navigation detected. Reloading data...");
            getallcats();
            getrecomm();
            getrecentss();
        }

        getallcats();
        getrecomm();
        getrecentss();

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

    }, [location.pathname]);


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
                            style={{ padding: "8px", cursor: "pointer" }}
                            onClick={() => getss(categories[openIndex].cid, categories[openIndex].cname)}                        >
                            All
                        </div>
                        {subcat.map((sub, id) => (
                            <React.Fragment key={`${sub.cid}-${id}`}>
                                <div

                                    style={{ padding: "8px", cursor: "pointer" }}
                                    onClick={() => getsubb(sub)} // or navigate/use the id
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





            {/*-----carousel-----*/}
            <Carousel className='mt-3 mb-3'>
                <Carousel.Item>
                    <img src="https://f.nooncdn.com/mpcms/EN0001/assets/02dc6103-033e-48f6-9454-2f8ee55e48a7.png" alt="" style={{ height: '350px', width: '100%', objectFit: 'cover' }} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src="https://f.nooncdn.com/mpcms/EN0001/assets/ce49b6eb-d967-4cc0-9f0b-81f2c9b44627.png" alt="" style={{ height: '350px', width: '100%', objectFit: 'cover' }} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src="https://f.nooncdn.com/ads/banner-1008x1008/en_dk_uae-hero-01%20%E2%80%93%202%20(1).1748874675.5339878.png" alt="" style={{ height: '350px', width: '100%', objectFit: 'cover' }} />
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
            {
                recent?.length > 0 && (
                    <>
                        <h3 className="text-start ht1 container mb-4 mt-5">
                            RECENTLY <span className='lt1'> viewed</span>
                        </h3>
                        <div className='container d-flex justify-content-between dd mb-4'>
                            {
                                recent.slice(0, 4).map((item) => (
                                    item?.image && item?.title && item?.price && (
                                        <Prodcard key={item.pid} data={item} />
                                    )
                                ))
                            }
                        </div>
                    </>
                )
            }





            {/* ---------recommended--------- */}
            <h3 className="text-start ht1 container mb-4 mt-5">RECOMMENDED <span className='lt1'> for you..</span> </h3>
            <div className=' container d-flex justify-content-between dd mb-4'>
                {
                    recom?.map((item) => (
                        item?.image && item?.title && item?.price && (
                            <Prodcard key={item.pid} data={item} />
                        )))
                }

            </div>



        </>


    )
}

export default Homes
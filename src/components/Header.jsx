import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import im from '../assets/s (1).jpg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Header() {

   const navigate=useNavigate()

  const logout=async()=>{
    sessionStorage.clear()
    navigate('/log')
  }
  return (
    <div>
         <Navbar expand="lg" style={{ backgroundColor: 'white' }}>
      <Container>
        <Navbar.Brand href="">
          <img src={im} alt="Logo" style={{ height: '55px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          </Nav>

          
          <Nav className="ms-auto">
            <Nav.Link >
              <Link to={'wish'}><i className="fa-solid fa-heart fa-2xl ms-3" style={{ color: '#000000' }}></i></Link>
            </Nav.Link>
            <Nav.Link href="">
              <Link to={'cart'}>       <i className="fa-solid fa-cart-shopping ms-3 fa-2xl" style={{ color: '#000000' }}></i></Link>
            </Nav.Link>
          </Nav>
          <Nav.Link href="">
                          <Link to=''>       <i className="fa-solid fa-user ms-3 fa-lg" style={{ color: '#000000' }} onClick={logout}>LOGOUT</i></Link>

            </Nav.Link>

        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Header
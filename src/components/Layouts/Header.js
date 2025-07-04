import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo/logo.png';
import useCartStore from '../../store/cartStore';
import '../../styles/HeaderStyle.css';

function Header() {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const isAuthenticated = !!localStorage.getItem('token');

  const changeValueOnScroll = () => {
    const scrollValue = document?.documentElement?.scrollTop;
    setNav(scrollValue > 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeValueOnScroll);
    return () => window.removeEventListener('scroll', changeValueOnScroll);
  }, []);

  const handleContactClick = () => {
    navigate('/', { state: { scrollTo: 'contact' } });
  };

  const handleReviewClick = () => {
    navigate('/', { state: { scrollTo: 'review' } });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" className={`${nav ? 'sticky' : ''}`}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="logo">
            <img src={Logo} alt="Tasty Burger Logo" className="img-fluid" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/menu">Our Menu</Nav.Link>
              <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
              <Nav.Link as="button" onClick={handleReviewClick} className="btn btn-link p-0 nav-link">
                Review
              </Nav.Link>
              <Nav.Link as="button" onClick={handleContactClick} className="btn btn-link p-0 nav-link">
                Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                <div className="cart">
                  <i className="bi bi-bag fs-5"></i>
                  {totalItems > 0 && <em className="roundpoint">{totalItems}</em>}
                </div>
              </Nav.Link>
              {isAuthenticated ? (
                <Nav.Link as="button" onClick={handleLogout} className="btn btn-link p-0 nav-link">
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login"></Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
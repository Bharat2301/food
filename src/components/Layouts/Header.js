import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import "../../styles/HeaderStyle.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo/logo.png";

function Header() {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  // Scroll Navbar
  const changeValueOnScroll = () => {
    const scrollValue = document?.documentElement?.scrollTop;
    setNav(scrollValue > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeValueOnScroll);
    return () => window.removeEventListener("scroll", changeValueOnScroll);
  }, []);

  // Scroll Handlers
  const handleContactClick = () => {
    navigate("/", { state: { scrollTo: "contact" } });
  };

  const handleReviewClick = () => {
    navigate("/", { state: { scrollTo: "review" } });
  };

  return (
    <header>
      <Navbar collapseOnSelect expand="lg" className={`${nav ? "sticky" : ""}`}>
        <Container>
          <Navbar.Brand as={Link} to="/" className="logo">
            <img src={Logo} alt="Logo" className="img-fluid" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/menu">Our Menu</Nav.Link>
             
              <Nav.Link as={Link} to="/blog">Blog</Nav.Link>

              {/* Scroll to Review (Section6) */}
              <Nav.Link as="button" onClick={handleReviewClick} className="btn btn-link p-0 nav-link">
                Review
              </Nav.Link>

              {/* Scroll to Contact (Section7) */}
              <Nav.Link as="button" onClick={handleContactClick} className="btn btn-link p-0 nav-link">
                Contact
              </Nav.Link>

              <Nav.Link as={Link} to="/cart">
                <div className="cart">
                  <i className="bi bi-bag fs-5"></i>
                  <em className="roundpoint">2</em>
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Burger from "../../assets/hero/hero-2.png";
import { Link } from 'react-router-dom';

function Section1() {
    return (
        <section className="hero_section">
            <Container>
                <Row>
                    <Col lg={7} className="mb-5 mb-lg-0">
                        <div className="position-relative" style={{ marginTop: "170px" }}>

                            <img src={Burger} className="img-fluid " alt="Hero" />
                            <div className="price_badge">
                                <div className="badge_text">
                                    <h4 className="h4_xs"> Only</h4>
                                    <h4 className="h3_lg">₹  199</h4>

                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={5}>
                        <div className="hero_text text-center"  style={{ marginTop: "120px" }}>
                            <h1 className="text-white">New burger</h1>
                            <h2 className="text-white">With Onion</h2>
                            <p className="text-white pt-2 pb-4">New burger sensation stacked with crispy golden onions and bold, savory flavor in every juicy bite. Featuring a perfectly grilled, beef patty smothered in our signature smoky sauce, layered with melted aged cheddar, and topped with fresh lettuce and vine-ripened tomatoes -all nestled  buttery, toasted brioche buns.

                            </p>
                            <Link to="/Login" className="btn order_now"> Login </Link>
                        </div></Col>
                </Row>
            </Container>
        </section>
    )
}

export default Section1
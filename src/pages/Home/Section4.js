import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PromotionImage from "../../assets/promotion/pro.png";

function Section4() {
  return (
    <>
      <section className="promotion_section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="text-center mb-5 mb-lg-0">
              <img src={PromotionImage} className="img-fluid" alt="Promotion" />
            </Col>
            <Col
              lg={6}
              style={{
                paddingRight: "3rem",
                paddingLeft: "4rem"
              }}
            >
              <h2>Nothing brings people together like a good burger</h2>
              <p>
                There’s something magical about sharing a juicy, flavorful burger with friends and family. Whether it’s a backyard BBQ, a late-night diner run, or a celebration, burgers create moments worth savoring.
              </p>
              <ul>
                <li>
                  <p>
                   🍔 Handcrafted patties with premium beef, seasoned to perfection
                  </p>
                </li>
                <li>
                  <p>
                   🧀 Melted cheese, crispy bacon, and fresh toppings piled high
                  </p>
                </li>
                <li>
                  <p>
                   🥗 Customizable for every taste – from classic to adventurous
                  </p>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      {/* BG Parallax Scroll */}
      <section className="bg_parallax_scroll"></section>
    </>
  );
}

export default Section4;

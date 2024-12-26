import React from 'react';
import { Container,Row, Col } from 'react-bootstrap';
import PromotionImage from "../../assets/promotion/pro.png"

function Section4() {
  return (
  <>
  <section className="promotion_section">
    <Container>
        <Row className="align-items-center">
            <Col lg={6} className="text-center mb-5 mb-lg-0">
            <img src={PromotionImage} className="img-fluild" alt="Promotion" />
            </Col>
            <Col lg={6} className="px-5">
            <h2>Nothing brings people together like a good burger</h2>
            <p> Semper lacus cursus porta primis lijfjdfkk sjbjsbf dbfjsbfkd jhdfsfk sdfjbsdfj jsdfjdsb 
            dfjbsdfjbd jfbjsdbf jdbfjdsb jbfjsdb asvfhasv nhgfd kewhfkew ewwe wkethke jhewhewkj ehwthewjew
                </p>
            <ul>
                <li> <p> 
                    Fringilla risus, jsbjdbs sbjsbf sjbjsbf jsfbjs jsbfjsb jsbfjsbeu jfbeb jegi jsbfjs 
                    </p></li>
                <li> <p>
                    Quareat sbfnsfb asbfjsab hsfvhs hsvfshv jsbfj </p></li>
                <li> <p>
                    Nemo ipsam egetsa jdbfjdb agsdgs jsfhsdgh sfhs hdkgkb jsbfjg wjrw gruwgrugw wrguwg </p></li>
            </ul>
            </Col>
        </Row>
    </Container>
  </section>

  {/* BG Parallax Scroll */}
  <section className="bg_parallax_scroll">
    
  </section>
  </>
)
}

export default Section4
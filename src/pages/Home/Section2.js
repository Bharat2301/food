import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pizza from "../../assets/about/pizza.png";
import Salad from "../../assets/about/salad.png";
import Delivery from "../../assets/about/delivery-bike.png";



// Mock Data Cards
const mockData = [
    {
      image: Pizza,
      title: "Original",
      paragraph: `Hand-tossed crust perfected over generations, topped with our signature tomato sauce, fresh mozzarella, and garden-picked basil. Baked in a stone-fired oven for that irresistible crispy yet chewy texture - just like Nonna used to make.`,
    },
    {
      image: Salad,
      title: "Qualty Foods",
      paragraph: `Fresh, crisp greens harvested at peak freshness, paired with locally-sourced vegetables and premium ingredients. Each vibrant bowl is packed with nutrient-rich superfoods, house-made dressings, and artisanal toppings - because quality matters in every bite. `,
    },
    {
      image: Delivery,
      title: "Fastest Delivery",
      paragraph: `Hungry? Your food arrives at lightning speed! Our riders hit the road the moment your order is placed, ensuring piping-hot meals reach your door in record time. Track your delivery in real-time—because great food shouldn’t keep you waiting.`,
    },
    // Add more mock data objects as needed
  ];


function Section2() {
  return (
    <>
    <section className="about_section">
    <Container>
        <Row>
            <Col lg={{span:8, offset:2}} className="text-center">
            <h2> The burger tastes better when you eat it with your family</h2>
            <p>
          Share the joy of our new burger sensation—stacked with crispy golden onions and bold, smoky flavor—with those who matter most. Every juicy bite of our fire-grilled beef patty, melted cheddar, and crunchy beer-battered onions becomes even more delicious when enjoyed together.

                </p>
         < Link to="/" className="btn order_now btn_red">
         Explore Full Menu</Link>
            </Col>
        </Row>
    </Container>
   </section>
   <section className="about_wrapper">
    <Container>
        <Row className="justify-content-md-center">
        {mockData.map((cardData, index)=>(
            <Col md={6} lg={4} className="mb-4 mb-md-0" key={index}>
                <div className="about_box text-center">
                    <div className="about_icon">
                        <img src={cardData.image} className="img-fluid"
                        alt="icon" />

                    </div>
                    <h4> {cardData.title}</h4>
                    <p>{cardData.paragraph}</p> 
                </div>
            </Col>
        ))}
        </Row>
    </Container>

   </section>
    </>
   
  )
}

export default Section2
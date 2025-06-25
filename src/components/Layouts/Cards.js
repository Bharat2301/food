import React, { useState } from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';

function Cards({ id, image, rating, title, paragraph, price, renderRatingIcons }) {
  const addItem = useCartStore((state) => state.addItem);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id,
      image,
      title,
      paragraph,
      price,
      rating,
    });
  };

  const toggleWishlist = () => {
    setIsWishlisted(prev => !prev);
  };

  return (
    <Col sm={6} lg={4} xl={3} className="mb-4">
      <Card className="overflow-hidden">
        <div className="overflow-hidden">
          <Card.Img variant="top" src={image} />
        </div>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between">
            <div className="item_rating">{renderRatingIcons(rating)}</div>
            <div className="wishlist" onClick={toggleWishlist} style={{ cursor: 'pointer' }}>
              <i className={`bi ${isWishlisted ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
            </div>
          </div>

          <Card.Title>{title}</Card.Title>
          <Card.Text>{paragraph}</Card.Text>

          <div className="d-flex align-items-center justify-content-between">
            <div className="menu_price">
              <h5 className="mb-0">₹ {price}</h5>
            </div>
            <div className="add_to_card">
              <button onClick={handleAddToCart} className="btn btn-danger">
                <i className="bi bi-bag me-2"></i>
                Add To Cart
              </button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Cards;

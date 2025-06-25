import React, { useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import axios from 'axios';
import '../../styles/CartStyle.css';

function Cart() {
  const {
    cartItems,
    fetchCartItems,
    updateQuantity,
    removeItem,
    getTotalAmount,
    clearCart,
  } = useCartStore();
  const navigate = useNavigate();

  // Fetch cart items when component mounts
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCheckout = async () => {
    const totalAmount = getTotalAmount() * 100; // Razorpay expects amount in paise

    try {
      // Create order on backend
      const orderResponse = await axios.post(
        'http://localhost:5000/api/create-order',
        {
          userId: useCartStore.getState().userId,
          amount: totalAmount,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
          items: cartItems, // Include cart items
        }
      );

      const { id: order_id, amount, currency } = orderResponse.data;

      // Initialize Razorpay
      const options = {
        key: 'rzp_test_UiTkSmK6mjclhU', // Your Razorpay Key ID
        amount: amount,
        currency: currency,
        name: 'Tasty Burger',
        description: 'Order Payment',
        image: '/assets/logo/logo.png',
        order_id: order_id,
        handler: async function (response) {
          // Save order to MongoDB
          await axios.post('http://localhost:5000/api/save-order', {
            userId: useCartStore.getState().userId,
            items: cartItems,
            totalAmount: getTotalAmount(),
            paymentId: response.razorpay_payment_id,
            orderId: order_id,
            currency,
          });
          // Clear cart after successful payment
          await clearCart();
          alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
          navigate('/');
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9998887777',
        },
        theme: {
          color: '#dc3545',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container className="cart-empty">
        <h2>Your Cart is Empty</h2>
        <p>
          Your shopping cart is currently empty. Start adding items to your cart
          to view them here.
        </p>
        <Button variant="primary" onClick={() => navigate('/menu')}>
          Go to Menu
        </Button>
      </Container>
    );
  }

  return (
    <Container className="cart-container">
      <h2>My Cart</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </td>
              <td>{item.title}</td>
              <td>₹ {item.price}</td>
              <td>
                <Form.Control
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  style={{ width: '80px' }}
                />
              </td>
              <td>₹ {item.price * item.quantity}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="cart-summary">
        <h4>Total Amount: ₹ {getTotalAmount()}</h4>
        <div className="cart-actions">
          <Button
            variant="primary"
            onClick={() => navigate('/menu')}
            className="me-2"
          >
            Add More
          </Button>
          <Button variant="success" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Cart;
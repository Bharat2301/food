import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Spinner, Alert } from 'react-bootstrap';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch cart items and user profile when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user profile
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          navigate('/login');
        } else {
          setError('Failed to fetch user profile');
        }
      }
    };

    fetchUserProfile();
    fetchCartItems();
  }, [fetchCartItems, navigate]);

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
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      navigate('/login');
      return;
    }

    try {
      // Fetch Razorpay key
      const keyResponse = await axios.get('http://localhost:5000/api/razorpay-key');
      const razorpayKey = keyResponse.data.keyId;

      // Calculate total amount in paise
      const totalAmount = getTotalAmount() * 100;
      if (totalAmount <= 0) {
        setError('Cart total is invalid');
        setLoading(false);
        return;
      }

      // Create order on backend
      const orderResponse = await axios.post(
        'http://localhost:5000/api/create-order',
        {
          amount: totalAmount,
          currency: 'INR',
          receipt: `receipt_${Date.now()}`,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { id: order_id, amount, currency } = orderResponse.data;

      // Initialize Razorpay
      const options = {
        key: razorpayKey,
        amount: amount,
        currency: currency,
        name: 'Tasty Burger',
        description: 'Order Payment',
        image: '/assets/logo/logo.png',
        order_id: order_id,
        handler: async function (response) {
          try {
            // Save order to MongoDB
            await axios.post(
              'http://localhost:5000/api/save-order',
              {
                items: cartItems.map(item => ({
                  menuItemId: item._id, // Use MongoDB _id from MenuItem
                  quantity: item.quantity,
                })),
                totalAmount: getTotalAmount(),
                paymentId: response.razorpay_payment_id,
                orderId: order_id,
                currency,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            // Clear cart after successful payment
            await clearCart();
            alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
            navigate('/');
          } catch (err) {
            setError(
              err.response?.data?.error ||
                'Failed to save order. Please try again.'
            );
            if (err.response?.status === 401 || err.response?.status === 403) {
              localStorage.removeItem('token');
              localStorage.removeItem('userId');
              navigate('/login');
            }
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: user?.name || 'Customer Name',
          email: user?.email || 'customer@example.com',
          contact: user?.contact || '9998887777', // Add contact to User schema if needed
        },
        theme: {
          color: '#dc3545',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function () {
        setError('Payment failed. Please try again.');
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      setError(
        err.response?.data?.error ||
          'Failed to initiate payment. Please try again.'
      );
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
      }
      setLoading(false);
    }
  };

  const handleQuantityChange = (id, value) => {
    const quantity = parseInt(value);
    if (isNaN(quantity) || quantity < 1) {
      setError('Quantity must be at least 1');
      return;
    }
    updateQuantity(id, quantity);
  };

  if (cartItems.length === 0) {
    return (
      <Container className="cart-empty text-center my-5">
        <img
          src="/assets/images/empty-cart.png"
          alt="Empty Cart"
          style={{ width: '150px', marginBottom: '20px' }}
        />
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
    <Container className="cart-container my-5">
      <h2>My Cart</h2>
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
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
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  style={{ width: '80px' }}
                />
              </td>
              <td>₹ {item.price * item.quantity}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                  disabled={loading}
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
            disabled={loading}
          >
            Add More
          </Button>
          <Button
            variant="success"
            onClick={handleCheckout}
            disabled={loading || cartItems.length === 0}
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {' '}Processing...
              </>
            ) : (
              'Proceed to Checkout'
            )}
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Cart;
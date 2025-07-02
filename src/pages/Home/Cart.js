import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import axios from 'axios';
import { toast } from 'react-toastify';
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          navigate('/login');
          toast.error('Session expired. Please log in again.');
        } else {
          setError('Failed to fetch user profile');
          toast.error('Failed to fetch user profile.');
        }
      }
    };

    fetchUserProfile();
    fetchCartItems();
  }, [fetchCartItems, navigate]);

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
      toast.warn('Please log in to checkout.');
      return;
    }

    try {
      const keyResponse = await axios.get(`${process.env.REACT_APP_API_URL}api/razorpay/razorpay-key`);
      const razorpayKey = keyResponse.data.keyId;

      const totalAmount = getTotalAmount() * 100;
      if (totalAmount <= 0) {
        setError('Cart total is invalid');
        setLoading(false);
        toast.error('Cart total is invalid.');
        return;
      }

      const orderResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}api/create-order`,
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
            await axios.post(
              `${process.env.REACT_APP_API_URL}api/save-order`,
              {
                items: cartItems.map(item => ({
                  menuItemId: item.menuItemId.id, // Use custom id
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
            await clearCart();
            toast.success(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
            navigate('/');
          } catch (err) {
            setError(err.response?.data?.error || 'Failed to save order. Please try again.');
            toast.error(err.response?.data?.error || 'Failed to save order.');
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
          contact: user?.contact || '9998887777',
        },
        theme: {
          color: '#dc3545',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function () {
        setError('Payment failed. Please try again.');
        toast.error('Payment failed. Please try again.');
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to initiate payment. Please try again.');
      toast.error(err.response?.data?.error || 'Failed to initiate payment.');
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
      }
      setLoading(false);
    }
  };

  const handleQuantityChange = (menuItemId, value) => {
    const quantity = parseInt(value);
    if (isNaN(quantity) || quantity < 1) {
      setError('Quantity must be at least 1');
      toast.error('Quantity must be at least 1');
      return;
    }
    updateQuantity(menuItemId, quantity);
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
            <tr key={item.menuItemId.id}>
              <td>
                <img
                  src={item.menuItemId.image}
                  alt={item.menuItemId.title}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </td>
              <td>{item.menuItemId.title}</td>
              <td>₹ {item.menuItemId.price}</td>
              <td>
                <Form.Control
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.menuItemId.id, e.target.value)}
                  style={{ width: '80px' }}
                />
              </td>
              <td>₹ {item.menuItemId.price * item.quantity}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeItem(item.menuItemId.id)}
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
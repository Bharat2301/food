import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import Layout from '../../components/Layouts/Layout';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backened-76cg.onrender.com/api/contact', formData);
      setSuccess('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message.');
      setSuccess(null);
    }
  };

  return (
    <Layout>
      <Container className="py-5">
        <h2>Contact Us</h2>
        <p>We would love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.</p>
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              rows={4}
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Send Message
          </Button>
        </Form>
        <div className="mt-4">
          <p>Email: info@tastyburger.com</p>
          <p>Phone: 999-888-7777</p>
        </div>
      </Container>
    </Layout>
  );
}

export default Contact;
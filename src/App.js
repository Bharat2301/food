import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import About from "./pages/Home/About";
import Menu from "./pages/Home/Menu";
import Review from "./pages/Home/Review";
import Blog from "./pages/Home/Blog";
import Contact from "./pages/Home/Contact";
import Cart from "./pages/Home/Cart";
import Footer from "./components/Layouts/Footer";
import Login from "./pages/Home/Login";
import AdminLogin from "./pages/Home/AdminLogin";
import Signup from "./pages/Home/Signup";
import ProtectedRoute from "./pages/Home/ProtectedRoute";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/review" element={<Review />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><div>Admin Dashboard</div></ProtectedRoute>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
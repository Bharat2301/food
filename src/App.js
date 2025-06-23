import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/Home/About";
import Menu from "./pages/Home/Menu";
import Review from "./pages/Home/Review";
import Blog from "./pages/Home/Blog";
import Contact from "./pages/Home/Contact";
import Cart from "./pages/Home/Cart";
import Footer from "./components/Layouts/Footer";


function App(){
  return(
  <Router>
    <Routes>
      <Route path="/" element={ <Home />}/>
      <Route path="/about" element={ <About/>}/>
      <Route path="/menu" element={ <Menu />}/>
      
      <Route path="/blog" element={ <Blog />}/>
      <Route path="/Cart" element={ <Cart />}/>
      <Route path="/Footer" element={ <Footer />}/>
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  </Router>
 
  );
}

export default App;
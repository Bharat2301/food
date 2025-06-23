import React, { useEffect, useRef } from "react";
import Layout from '../../components/Layouts/Layout';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";
import Section7 from "./Section7";
import "../../styles/HomeStyle.css";
import { useLocation } from "react-router-dom";
import Footer from "../../components/Layouts/Footer";

function Home() {
  const location = useLocation();
  const contactRef = useRef(null);
  const reviewRef = useRef(null);

  useEffect(() => {
    const scrollTo = location.state?.scrollTo;

    if (scrollTo === "contact") {
      contactRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (scrollTo === "review") {
      reviewRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <Layout>
      {/* Home Section Hero Banner */}
      <Section1 />

      {/* Home Section About */}
      <Section2 />

      {/* Home Section Menu */}
      <Section3 />

      {/* Home Section Promotion */}
      <Section4 />

      {/* Home Section Shop */}
      <Section5 />

      {/* Home Section Review (with ref) */}
      <div ref={reviewRef}>
        <Section6 />
      </div>

      {/* Home Section Contact (with ref) */}
      <div ref={contactRef}>
        <Section7 />
      </div>
      <Footer/>
    </Layout>
  );
}

export default Home;

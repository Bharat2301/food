import React, { useState, useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const [counters, setCounters] = useState({
    years: 0,
    customers: 0,
    burgers: 0,
    rating: 0
  });
  
  const [isVisible, setIsVisible] = useState({
    story: false,
    features: false,
    stats: false,
    gallery: false
  });

  const statsRef = useRef(null);
  const storyRef = useRef(null);
  const featuresRef = useRef(null);
  const galleryRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          
          if (target === storyRef.current) {
            setIsVisible(prev => ({ ...prev, story: true }));
          } else if (target === featuresRef.current) {
            setIsVisible(prev => ({ ...prev, features: true }));
          } else if (target === statsRef.current) {
            setIsVisible(prev => ({ ...prev, stats: true }));
            startCounters();
          } else if (target === galleryRef.current) {
            setIsVisible(prev => ({ ...prev, gallery: true }));
          }
        }
      });
    }, observerOptions);

    const refs = [storyRef, featuresRef, statsRef, galleryRef];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  // Counter animation
  const startCounters = () => {
    const targets = { years: 20, customers: 50000, burgers: 150000, rating: 4.9 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    Object.keys(targets).forEach(key => {
      let current = 0;
      const target = targets[key];
      const step = target / steps;

      const counter = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(counter);
        }
        
        setCounters(prev => ({
          ...prev,
          [key]: key === 'rating' ? current.toFixed(1) : Math.floor(current)
        }));
      }, increment);
    });
  };

  const features = [
    {
      icon: '🏆',
      title: 'Award Winning',
      description: 'Recognized by food critics and customers nationwide for our exceptional quality and innovative recipes.',
      delay: '0.1s'
    },
    {
      icon: '🥩',
      title: 'Premium Ingredients',
      description: 'We source only the finest, locally-sourced ingredients to ensure every bite is fresh and flavorful.',
      delay: '0.2s'
    },
    {
      icon: '👨‍🍳',
      title: 'Master Chefs',
      description: 'Our experienced culinary team brings passion and expertise to every burger they craft.',
      delay: '0.3s'
    },
    {
      icon: '❤️',
      title: 'Family Legacy',
      description: 'A family-owned business built on tradition, love, and an unwavering commitment to excellence.',
      delay: '0.4s'
    }
  ];

  const galleryImages = [
    {
      src: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Signature Burger',
      title: 'Our Signature Creation'
    },
    {
      src: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Restaurant Interior',
      title: 'Cozy Atmosphere'
    },
    {
      src: 'https://images.pexels.com/photos/2089717/pexels-photo-2089717.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Chef at Work',
      title: 'Crafted with Care'
    },
    {
      src: 'https://images.pexels.com/photos/1556698/pexels-photo-1556698.jpeg?auto=compress&cs=tinysrgb&w=600',
      alt: 'Fresh Ingredients',
      title: 'Farm Fresh Quality'
    }
  ];

  return (
    <section className="about-section">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Our <span className="highlight">Story</span>
          </h1>
          <p className="hero-subtitle">
            Crafting exceptional burgers since 2023, we are dedicated to bringing you the best 
            flavors and experiences. Join us on a journey through Our History.
          </p>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </div>

      {/* Story Section */}
      <div className="container">
        <div ref={storyRef} className={`story-section ${isVisible.story ? 'animate-in' : ''}`}>
          <div className="story-grid">
            <div className="story-content">
              <h2 className="section-title">
                Where It All <span className="highlight">Began</span>
              </h2>
              <div className="story-text">
                <p className="story-paragraph">
                  In 2003, our founder Sarah Mitchell had a simple dream: to create the perfect burger 
                  that would bring families and friends together. What started as a small corner shop 
                  with just three tables has grown into a beloved community institution.
                </p>
                <p className="story-paragraph">
                  Every recipe in our kitchen tells a story of passion, innovation, and dedication. 
                  From our signature secret sauce to our hand-cut fries, each element is crafted 
                  with the same love and attention that Sarah put into that very first burger.
                </p>
                <p className="story-paragraph">
                  Today, we continue to honor that original vision while constantly innovating 
                  to bring you new flavors and experiences that exceed your expectations.
                </p>
              </div>
              <div className="story-cta">
                <button className="cta-button">
                  <span>Discover Our Menu</span>
                  <div className="button-arrow">→</div>
                </button>
              </div>
            </div>
            <div className="story-image">
              <div className="image-wrapper">
                <img 
                  src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Our founder Sarah Mitchell"
                  className="founder-image"
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3>Sarah Mitchell</h3>
                    <p>Founder & Head Chef</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div ref={featuresRef} className={`features-section ${isVisible.features ? 'animate-in' : ''}`}>
          <h2 className="section-title text-center">
            What Makes Us <span className="highlight">Special</span>
          </h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{ animationDelay: feature.delay }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-hover-effect"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className={`stats-section ${isVisible.stats ? 'animate-in' : ''}`}>
          <div className="stats-background">
            <div className="stats-overlay"></div>
            <div className="stats-content">
              <h2 className="stats-title">Our Journey in Numbers</h2>
              <div className="stats-grid">
              
                <div className="stat-item">
                  <div className="stat-number">{counters.customers.toLocaleString()}+</div>
                  <div className="stat-label">Happy Customers</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{counters.burgers.toLocaleString()}+</div>
                  <div className="stat-label">Burgers Served</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{counters.rating}★</div>
                  <div className="stat-label">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div ref={galleryRef} className={`gallery-section ${isVisible.gallery ? 'animate-in' : ''}`}>
          <h2 className="section-title text-center">
            A Glimpse Into Our <span className="highlight">World</span>
          </h2>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div key={index} className="gallery-item">
                <div className="gallery-image-wrapper">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="gallery-image"
                  />
                  <div className="gallery-overlay">
                    <h3 className="gallery-title">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Experience the Difference?</h2>
            <p className="cta-subtitle">
              Join thousands of satisfied customers who have made us their go-to burger destination.
            </p>
            <div className="cta-buttons">
              <button className="cta-primary">Order Now</button>
              <button className="cta-secondary">Visit Us</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
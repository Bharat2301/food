import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, Tag, ChevronRight, TrendingUp, Mail, MapPin, Phone, Instagram, Facebook, Twitter, Heart, Share2, MessageCircle, Menu, X, ChevronDown } from 'lucide-react';
import './Blog.css';

const Blog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [email, setEmail] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    useEffect(() => {
        setIsVisible(true);
        
        // Handle scroll effect for navbar
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const blogPosts = [
        {
            id: 1,
            title: "The Ultimate Guide to Creating the Perfect Burger",
            excerpt: "Discover the secrets behind crafting mouth-watering burgers that will leave your taste buds craving for more. From selecting the right meat to perfecting the seasoning.",
            content: "Full article content here...",
            image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "Recipes",
            date: "2024-01-15",
            readTime: "8 min read",
            author: "Chef Maria Rodriguez",
            tags: ["burger", "recipe", "cooking", "beef"],
            featured: true,
            likes: 247,
            comments: 34
        },
        {
            id: 2,
            title: "Top 10 Burger Joints You Must Visit This Year",
            excerpt: "A curated list of the most amazing burger restaurants across the country, featuring unique flavors and unforgettable dining experiences.",
            content: "Full article content here...",
            image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "Reviews",
            date: "2024-01-12",
            readTime: "6 min read",
            author: "Food Critic John Smith",
            tags: ["restaurants", "review", "travel"],
            likes: 189,
            comments: 28
        },
        {
            id: 3,
            title: "The History of the Hamburger: From Origins to Icon",
            excerpt: "Explore the fascinating journey of how the humble hamburger became one of the world's most beloved foods, from its disputed origins to modern innovations.",
            content: "Full article content here...",
            image: "https://images.pexels.com/photos/1556698/pexels-photo-1556698.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "News",
            date: "2024-01-10",
            readTime: "12 min read",
            author: "History Buff Sarah Johnson",
            tags: ["history", "culture", "food"],
            likes: 156,
            comments: 19
        },
        {
            id: 4,
            title: "Healthy Burger Alternatives: Guilt-Free Indulgence",
            excerpt: "Learn how to enjoy delicious burgers while maintaining a healthy lifestyle. Discover plant-based options, lean proteins, and nutritious toppings.",
            content: "Full article content here...",
            image: "https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "Tips",
            date: "2024-01-08",
            readTime: "5 min read",
            author: "Nutritionist Dr. Emily Chen",
            tags: ["healthy", "nutrition", "alternatives"],
            likes: 203,
            comments: 42
        },
        {
            id: 5,
            title: "Mastering the Art of Burger Photography",
            excerpt: "Professional tips for capturing Instagram-worthy burger photos that will make your followers drool. Lighting, angles, and styling secrets revealed.",
            content: "Full article content here...",
            image: "https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "Tips",
            date: "2024-01-05",
            readTime: "7 min read",
            author: "Food Photographer Alex Thompson",
            tags: ["photography", "social media", "tips"],
            likes: 134,
            comments: 16
        },
        {
            id: 6,
            title: "Seasonal Burger Creations: Spring Edition",
            excerpt: "Fresh, seasonal ingredients meet classic burger perfection. Discover spring-inspired burger recipes that celebrate the season's best flavors.",
            content: "Full article content here...",
            image: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=800",
            category: "Recipes",
            date: "2024-01-03",
            readTime: "9 min read",
            author: "Seasonal Chef David Wilson",
            tags: ["seasonal", "spring", "fresh ingredients"],
            likes: 178,
            comments: 23
        }
    ];

    const categories = ['All', 'Recipes', 'Reviews', 'News', 'Tips'];

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredPost = blogPosts.find(post => post.featured);
    const recentPosts = blogPosts.slice(0, 4);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        console.log('Newsletter signup:', email);
        setEmail('');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = (dropdown) => {
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    return (
        <div className="blog-container">
            {/* Enhanced Animated Header */}
            <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="header-content">
                    <div className="logo-section">
                        <div className="logo-icon">
                            <span className="burger-emoji">🍔</span>
                            <div className="logo-glow"></div>
                        </div>
                        <div className="logo-text">
                            <h1 className="site-title">
                                <span className="title-word">Tasty</span>
                                <span className="title-word">Burger</span>
                            </h1>
                            <p className="site-subtitle">Premium Food Blog</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="nav-menu desktop-nav">
                        <div className="nav-item">
                            <a href="#" className="nav-link">
                                <span>Home</span>
                                <div className="nav-underline"></div>
                            </a>
                        </div>
                        
                        <div className="nav-item dropdown">
                            <button 
                                className="nav-link dropdown-trigger"
                                onClick={() => toggleDropdown('recipes')}
                            >
                                <span>Recipes</span>
                                <ChevronDown className={`dropdown-icon ${activeDropdown === 'recipes' ? 'rotated' : ''}`} />
                                <div className="nav-underline"></div>
                            </button>
                            <div className={`dropdown-menu ${activeDropdown === 'recipes' ? 'active' : ''}`}>
                                <a href="#" className="dropdown-item">Beef Burgers</a>
                                <a href="#" className="dropdown-item">Chicken Burgers</a>
                                <a href="#" className="dropdown-item">Veggie Burgers</a>
                                <a href="#" className="dropdown-item">Gourmet Recipes</a>
                            </div>
                        </div>

                        <div className="nav-item dropdown">
                            <button 
                                className="nav-link dropdown-trigger"
                                onClick={() => toggleDropdown('reviews')}
                            >
                                <span>Reviews</span>
                                <ChevronDown className={`dropdown-icon ${activeDropdown === 'reviews' ? 'rotated' : ''}`} />
                                <div className="nav-underline"></div>
                            </button>
                            <div className={`dropdown-menu ${activeDropdown === 'reviews' ? 'active' : ''}`}>
                                <a href="#" className="dropdown-item">Restaurant Reviews</a>
                                <a href="#" className="dropdown-item">Product Reviews</a>
                                <a href="#" className="dropdown-item">Chef Interviews</a>
                            </div>
                        </div>

                        <div className="nav-item">
                            <a href="#" className="nav-link">
                                <span>About</span>
                                <div className="nav-underline"></div>
                            </a>
                        </div>
                        
                        <div className="nav-item">
                            <a href="#" className="nav-link">
                                <span>Contact</span>
                                <div className="nav-underline"></div>
                            </a>
                        </div>
                    </nav>

                    {/* Header Actions */}
                    <div className="header-actions">
                        <button className="search-toggle">
                            <Search className="search-icon-header" />
                        </button>
                        <button className="newsletter-cta">
                            <Mail className="mail-icon" />
                            <span>Subscribe</span>
                        </button>
                        <button 
                            className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
                            onClick={toggleMenu}
                        >
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                            <span className="hamburger-line"></span>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
                    <div className="mobile-nav-content">
                        <div className="mobile-nav-header">
                            <div className="mobile-logo">
                                <div className="logo-icon small">🍔</div>
                                <span>Tasty Burger</span>
                            </div>
                            <button className="mobile-close" onClick={toggleMenu}>
                                <X />
                            </button>
                        </div>
                        
                        <div className="mobile-nav-links">
                            <a href="#" className="mobile-nav-link">
                                <span>Home</span>
                                <ChevronRight className="mobile-arrow" />
                            </a>
                            <a href="#" className="mobile-nav-link">
                                <span>Recipes</span>
                                <ChevronRight className="mobile-arrow" />
                            </a>
                            <a href="#" className="mobile-nav-link">
                                <span>Reviews</span>
                                <ChevronRight className="mobile-arrow" />
                            </a>
                            <a href="#" className="mobile-nav-link">
                                <span>About</span>
                                <ChevronRight className="mobile-arrow" />
                            </a>
                            <a href="#" className="mobile-nav-link">
                                <span>Contact</span>
                                <ChevronRight className="mobile-arrow" />
                            </a>
                        </div>

                        <div className="mobile-nav-footer">
                            <button className="mobile-newsletter-btn">
                                <Mail className="mail-icon" />
                                <span>Subscribe to Newsletter</span>
                            </button>
                            <div className="mobile-social">
                                <a href="#" className="mobile-social-link">
                                    <Facebook />
                                </a>
                                <a href="#" className="mobile-social-link">
                                    <Instagram />
                                </a>
                                <a href="#" className="mobile-social-link">
                                    <Twitter />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`mobile-overlay ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
            </header>

            {/* Hero Section */}
            <section className={`hero-section ${isVisible ? 'visible' : ''}`}>
                <div className="hero-content">
                    <div className="hero-text">
                        <h2 className="hero-title">
                            Delicious Stories &
                            <span className="hero-highlight"> Burger Tales</span>
                        </h2>
                        <p className="hero-description">
                            Discover the world of gourmet burgers, secret recipes, and culinary adventures. 
                            Your ultimate destination for everything burger-related.
                        </p>
                        
                        {/* Search Bar */}
                        <div className="search-container">
                            <div className="search-wrapper">
                                <Search className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search for recipes, reviews, tips..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Featured Post */}
                    {featuredPost && (
                        <div className="featured-post">
                            <div className="featured-content">
                                <div className="featured-image">
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        className="featured-img"
                                    />
                                    <div className="featured-badge">Featured</div>
                                </div>
                                <div className="featured-text">
                                    <div className="featured-meta">
                                        <span className="category-badge">{featuredPost.category}</span>
                                        <div className="date-info">
                                            <Calendar className="icon-small" />
                                            {featuredPost.date}
                                        </div>
                                    </div>
                                    <h3 className="featured-title">{featuredPost.title}</h3>
                                    <p className="featured-excerpt">{featuredPost.excerpt}</p>
                                    <div className="featured-footer">
                                        <div className="post-stats">
                                            <div className="stat-item">
                                                <Clock className="icon-small" />
                                                {featuredPost.readTime}
                                            </div>
                                            <div className="stat-item">
                                                <Heart className="icon-small" />
                                                {featuredPost.likes}
                                            </div>
                                            <div className="stat-item">
                                                <MessageCircle className="icon-small" />
                                                {featuredPost.comments}
                                            </div>
                                        </div>
                                        <button className="read-more-btn">
                                            <span>Read More</span>
                                            <ChevronRight className="icon-small" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Main Content */}
            <section className="main-content">
                <div className="content-wrapper">
                    {/* Blog Posts */}
                    <div className="posts-section">
                        {/* Category Filter */}
                        <div className="category-filter">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Blog Posts Grid */}
                        <div className="posts-grid">
                            {filteredPosts.map((post, index) => (
                                <article
                                    key={post.id}
                                    className={`post-card ${isVisible ? 'visible' : ''}`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="post-image">
                                        <img src={post.image} alt={post.title} className="post-img" />
                                        <div className="post-category">{post.category}</div>
                                        <button className="share-btn">
                                            <Share2 className="icon-small" />
                                        </button>
                                    </div>
                                    <div className="post-content">
                                        <div className="post-meta">
                                            <div className="meta-item">
                                                <Calendar className="icon-small" />
                                                {post.date}
                                            </div>
                                            <div className="meta-item">
                                                <Clock className="icon-small" />
                                                {post.readTime}
                                            </div>
                                        </div>
                                        <h3 className="post-title">{post.title}</h3>
                                        <p className="post-excerpt">{post.excerpt}</p>
                                        <div className="post-footer">
                                            <div className="post-stats">
                                                <div className="stat-item">
                                                    <Heart className="icon-small" />
                                                    {post.likes}
                                                </div>
                                                <div className="stat-item">
                                                    <MessageCircle className="icon-small" />
                                                    {post.comments}
                                                </div>
                                            </div>
                                            <button className="read-more-link">
                                                <span>Read More</span>
                                                <ChevronRight className="icon-small" />
                                            </button>
                                        </div>
                                        <div className="post-tags">
                                            {post.tags.map((tag) => (
                                                <span key={tag} className="tag">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {filteredPosts.length === 0 && (
                            <div className="no-posts">
                                <div className="no-posts-title">No posts found matching your criteria</div>
                                <p className="no-posts-text">Try adjusting your search terms or category filter</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Recent Posts */}
                        <div className="sidebar-card">
                            <h3 className="sidebar-title">
                                <TrendingUp className="sidebar-icon" />
                                Recent Posts
                            </h3>
                            <div className="recent-posts">
                                {recentPosts.map((post) => (
                                    <div key={post.id} className="recent-post">
                                        <img src={post.image} alt={post.title} className="recent-img" />
                                        <div className="recent-content">
                                            <h4 className="recent-title">
                                                {post.title.length > 60 ? post.title.substring(0, 60) + '...' : post.title}
                                            </h4>
                                            <p className="recent-date">{post.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="sidebar-card">
                            <h3 className="sidebar-title">
                                <Tag className="sidebar-icon" />
                                Categories
                            </h3>
                            <div className="categories-list">
                                {categories.slice(1).map((category) => {
                                    const count = blogPosts.filter(post => post.category === category).length;
                                    return (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className="category-item"
                                        >
                                            <span className="category-name">{category}</span>
                                            <span className="category-count">{count}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="newsletter-card">
                            <h3 className="newsletter-title">
                                <Mail className="sidebar-icon" />
                                Newsletter
                            </h3>
                            <p className="newsletter-text">
                                Get the latest burger recipes and food tips delivered to your inbox!
                            </p>
                            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="newsletter-input"
                                    required
                                />
                                <button type="submit" className="newsletter-btn">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-main">
                        <div className="footer-logo">
                            <div className="logo-icon">🍔</div>
                            <div className="logo-text">
                                <h3 className="footer-title">Tasty Burger</h3>
                                <p className="footer-subtitle">Blog</p>
                            </div>
                        </div>
                        <p className="footer-description">
                            Your ultimate destination for burger recipes, restaurant reviews, and culinary adventures. 
                            Join our community of burger enthusiasts!
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link">
                                <Facebook className="social-icon" />
                            </a>
                            <a href="#" className="social-link">
                                <Instagram className="social-icon" />
                            </a>
                            <a href="#" className="social-link">
                                <Twitter className="social-icon" />
                            </a>
                        </div>
                    </div>
                    
                    <div className="footer-links">
                        <h4 className="footer-section-title">Quick Links</h4>
                        <ul className="footer-list">
                            <li><a href="#" className="footer-link">Home</a></li>
                            <li><a href="#" className="footer-link">Recipes</a></li>
                            <li><a href="#" className="footer-link">Reviews</a></li>
                            <li><a href="#" className="footer-link">About Us</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-contact">
                        <h4 className="footer-section-title">Contact</h4>
                        <ul className="contact-list">
                            <li className="contact-item">
                                <MapPin className="contact-icon" />
                                123 Burger Street, Food City
                            </li>
                            <li className="contact-item">
                                <Phone className="contact-icon" />
                                (555) 123-BURGER
                            </li>
                            <li className="contact-item">
                                <Mail className="contact-icon" />
                                hello@tastyburger.blog
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>© 2024 Tasty Burger Blog. All rights reserved. Made with ❤️ for burger lovers.</p>
                </div>
            </footer>
        </div>
    );
};

export default Blog;
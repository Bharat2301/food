import React from "react";
import PropTypes from "prop-types";
import { FaEnvelope, FaSearch, FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaRegClock, FaRegUser, FaRegCalendarAlt } from "react-icons/fa";

// Section Header
const SectionHeader = ({ title, subtitle = "", color = "text-red-600", className = "" }) => (
  <div className={`text-center mb-16 ${className}`}>
    {subtitle && <p className="text-lg text-yellow-600 font-semibold mb-2">{subtitle}</p>}
    <h2
      className={`text-4xl md:text-5xl font-extrabold ${color} font-['Pacifico'] mb-4`}
    >
      {title}
    </h2>
    <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
  </div>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
};

// Blog Post Card
const BlogPostCard = ({ title, excerpt, image, date, author, category, readTime }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer flex flex-col h-full hover:-translate-y-2 hover:shadow-xl transition-all duration-500 ease-in-out group">
    <div className="relative overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
      <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full z-20">
        {category}
      </span>
    </div>
    <div className="p-6 flex flex-col justify-between flex-1">
      <div>
        <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
          <span className="flex items-center"><FaRegUser className="mr-1" /> {author}</span>
          <span className="flex items-center"><FaRegCalendarAlt className="mr-1" /> {date}</span>
          <span className="flex items-center"><FaRegClock className="mr-1" /> {readTime}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-red-600 transition-colors">{title}</h3>
        <p className="text-gray-600 line-clamp-3 mb-4">{excerpt}</p>
      </div>
      <a
        href="#"
        className="inline-flex items-center mt-auto text-red-600 font-semibold hover:text-red-800 transition-colors"
      >
        Read More
     
      </a>
    </div>
  </div>
);

BlogPostCard.propTypes = {
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  readTime: PropTypes.string.isRequired,
};

// Sidebar Widget
const SidebarWidget = ({ title, children }) => (
  <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
    <h3 className="text-xl font-semibold text-red-600 mb-4 pb-2 border-b border-gray-200">{title}</h3>
    {children}
  </div>
);

SidebarWidget.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

// Popular Post Card
const PopularPostCard = ({ title, image, date }) => (
  <div className="flex items-center mb-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0 last:mb-0">
    <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="ml-4">
      <h4 className="text-sm font-medium text-gray-900 hover:text-red-600 transition-colors line-clamp-2">
        <a href="#">{title}</a>
      </h4>
      <p className="text-xs text-gray-500 mt-1">{date}</p>
    </div>
  </div>
);

PopularPostCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

// Tag Component
const Tag = ({ children }) => (
  <a href="#" className="inline-block bg-gray-100 hover:bg-red-600 hover:text-white text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2 transition-colors">
    {children}
  </a>
);

Tag.propTypes = {
  children: PropTypes.node.isRequired,
};

// Social Icon
const SocialIcon = ({ icon, url }) => {
  const IconComponent = icon;
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-600 text-gray-700 hover:text-white flex items-center justify-center transition-colors"
    >
      <IconComponent className="text-lg" />
    </a>
  );
};

SocialIcon.propTypes = {
  icon: PropTypes.elementType.isRequired,
  url: PropTypes.string.isRequired,
};

// Blog Data
const blogPosts = [
  {
    title: "Introducing Our New Spicy Sizzler Burger - Limited Time Only!",
    excerpt: "Ignite your taste buds with our Spicy Sizzler Burger featuring house-made jalapeño sauce, pepper jack cheese, and crispy onion rings. This limited-time offering is packed with flavor and just the right amount of heat.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "June 15, 2025",
    author: "Emma Frye",
    category: "New Menu",
    readTime: "4 min read"
  },
  {
    title: "Crafting the Perfect Bun: A Behind-the-Scenes Look at Our Bakery",
    excerpt: "Discover the secrets behind our soft, delicious buns that make every burger special. From selecting the finest flour to our unique proofing process, we take you inside our bakery where magic happens daily.",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "June 10, 2025",
    author: "John Burger",
    category: "Behind the Scenes",
    readTime: "6 min read"
  },
  {
    title: "Summer BBQ Event: A Tasty Recap of Our Biggest Party Yet",
    excerpt: "Relive the joy of our Summer BBQ with live music, burger eating contests, and exclusive menu items. Over 500 burger lovers joined us for this unforgettable day of food, fun, and community.",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "June 5, 2025",
    author: "Mike Relish",
    category: "Events",
    readTime: "5 min read"
  },
  {
    title: "The Art of Pairing Burgers with Craft Beers: A Connoisseur's Guide",
    excerpt: "Elevate your burger experience with our guide to pairing different burger styles with craft beers. From hoppy IPAs to rich stouts, learn which brews complement our signature burgers perfectly.",
    image: "https://images.unsplash.com/photo-1513309914637-65c20a5962e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "May 28, 2025",
    author: "Emma Frye",
    category: "Food Pairing",
    readTime: "8 min read"
  },
  {
    title: "Secret Sauce Revealed: Our Chef Shares His Burger Sauce Recipe",
    excerpt: "For the first time ever, our head chef shares his famous burger sauce recipe. With just 7 ingredients, you can recreate this tangy, creamy sauce at home to elevate your backyard burgers.",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "May 20, 2025",
    author: "Chef Carlos",
    category: "Recipes",
    readTime: "3 min read"
  },
  {
    title: "Sustainable Burgers: How We're Reducing Our Environmental Impact",
    excerpt: "Learn about our new sustainability initiatives, from locally-sourced ingredients to compostable packaging. We're committed to serving delicious burgers while protecting our planet for future generations.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    date: "May 12, 2025",
    author: "Sarah Green",
    category: "Sustainability",
    readTime: "7 min read"
  },
];

const categories = [
  { name: "New Menu", count: 12 },
  { name: "Behind the Scenes", count: 8 },
  { name: "Events", count: 15 },
  { name: "Food Pairing", count: 6 },
  { name: "Recipes", count: 9 },
  { name: "Sustainability", count: 5 }
];

const popularPosts = [
  {
    title: "Our Award-Winning Classic Cheeseburger Recipe",
    image: "https://images.unsplash.com/photo-1547584370-2cc98b8b8dc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    date: "June 18, 2025"
  },
  {
    title: "Top 10 Burger Toppings You Need to Try",
    image: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    date: "June 12, 2025"
  },
  {
    title: "Interview with Our Founder: The Tasty Burger Story",
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
    date: "June 8, 2025"
  }
];

const tags = [
  "Burger", "Recipe", "Cheese", "BBQ", "Beef", "Chicken", "Vegetarian", 
  "Sauce", "Buns", "Grill", "Summer", "Event", "Beer", "Wine", "Local"
];

// Blog Page
const BlogPage = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-50 to-orange-50 min-h-screen">
      {/* Navigation */}
     

      {/* Hero Section */}
      <section
        className="relative py-32 md:py-48 text-center bg-cover bg-center bg-no-repeat flex items-center justify-center"
         style={{ 
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://res.cloudinary.com/dugh8szaj/image/upload/v1750682175/hero-1_ftqnke.jpg')`,
    backgroundPosition: 'center 30%',
    backgroundSize: 'cover'
  }}
      >
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-['Pacifico'] drop-shadow-lg">
            Tasty Burger Blog
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow mb-8 text-white">
            Savor the latest news, mouth-watering recipes, and behind-the-scenes stories from Tasty Burger.
          </p>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search blog posts..."
              className="w-full pl-8 pr-15 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-4"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors ">
              <FaSearch />
            </button>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 xl:px-32">
        <div className="container mx-auto">
          <SectionHeader 
            title="Latest Posts" 
            subtitle="Fresh From Our Kitchen" 
            color="text-red-600"
          />
          
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="grid md:grid-cols-2 gap-8">
                {blogPosts.map((post, index) => (
                  <BlogPostCard key={index} {...post} />
                ))}
              </div>
              
              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <a href="#" className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-red-600 hover:text-white transition-colors">
                    Previous
                  </a>
                  <a href="#" className="px-4 py-2 border border-gray-300 rounded-full bg-red-600 text-white">
                    1
                  </a>
                  <a href="#" className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-red-600 hover:text-white transition-colors">
                    2
                  </a>
                  <a href="#" className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-red-600 hover:text-white transition-colors">
                    3
                  </a>
                  <a href="#" className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-red-600 hover:text-white transition-colors">
                    Next
                  </a>
                </nav>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              {/* About Widget */}
              <SidebarWidget title="About Tasty Burger">
                <div className="flex flex-col items-center text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                    alt="Tasty Burger" 
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <p className="text-gray-600 mb-4">
                    Founded in 2010, Tasty Burger is dedicated to serving the juiciest, most flavorful burgers made with locally-sourced ingredients.
                  </p>
                  <div className="flex space-x-3">
                    <SocialIcon icon={FaFacebook} url="#" />
                    <SocialIcon icon={FaInstagram} url="#" />
                    <SocialIcon icon={FaTwitter} url="#" />
                    <SocialIcon icon={FaPinterest} url="#" />
                  </div>
                </div>
              </SidebarWidget>
              
              {/* Categories Widget */}
              <SidebarWidget title="Categories">
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <a href="#" className="text-gray-600 hover:text-red-600 transition-colors">
                        {category.name}
                      </a>
                      <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </SidebarWidget>
              
              {/* Popular Posts Widget */}
              <SidebarWidget title="Popular Posts">
                <div className="space-y-4">
                  {popularPosts.map((post, index) => (
                    <PopularPostCard key={index} {...post} />
                  ))}
                </div>
              </SidebarWidget>
              
              {/* Tags Widget */}
              <SidebarWidget title="Tags">
                <div className="flex flex-wrap">
                  {tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </div>
              </SidebarWidget>
              
              {/* Newsletter Widget */}
              <SidebarWidget title="Newsletter">
                <p className="text-gray-600 mb-4">
                  Subscribe to our newsletter to get the latest blog posts and special offers.
                </p>
                <div className="relative mb-3">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <button className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition-colors">
                  Subscribe
                </button>
              </SidebarWidget>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 xl:px-32 bg-gray-50">
        <div className="container mx-auto">
          <SectionHeader 
            title="Featured Post" 
            subtitle="Editor's Pick" 
            color="text-red-600"
          />
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Featured Burger" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <span className="inline-block bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                  Featured
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  The Ultimate Burger Guide: Our 10 All-Time Favorite Recipes
                </h3>
                <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
                  <span className="flex items-center"><FaRegUser className="mr-1" /> Chef Carlos</span>
                  <span className="flex items-center"><FaRegCalendarAlt className="mr-1" /> June 1, 2025</span>
                  <span className="flex items-center"><FaRegClock className="mr-1" /> 10 min read</span>
                </div>
                <p className="text-gray-600 mb-6">
                  After a decade of perfecting our craft, we're sharing our top 10 burger recipes that have stood the test of time. From classic cheeseburgers to innovative gourmet creations, these recipes represent the best of what Tasty Burger has to offer.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-red-600 font-semibold hover:text-red-800 transition-colors text-lg"
                >
                  Read Full Article
               
               
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 xl:px-32 bg-gradient-to-r from-red-600 to-red-800 text-black">
        <div className="container mx-auto max-w-4xl text-center">
          <SectionHeader 
            title="Stay in the Loop" 
            subtitle="Don't Miss Out" 
            color="text-red"
          />
          
          <p className="text-lg mb-8 text-white/90">
            Join our newsletter to get the latest blog posts, exclusive offers, and Tasty Burger updates delivered straight to your inbox!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative w-full sm:w-96">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <button className="bg-yellow-400 text-red-700 px-8 py-4 font-bold border border-red-700 hover:bg-yellow-500 transition duration-300 whitespace-nowrap"
  style={{ borderRadius: "20px" }} >
              Subscribe Now
            </button>
          </div>
          
          <p className="text-sm mt-4 text-white/70">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-red py-12 px-4 md:px-8 lg:px-16 xl:px-32">
        <div className="container mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4 font-['Pacifico']">Tasty Burger</h4>
            <p className="text-gray-400 mb-4">
              Serving the juiciest, most flavorful burgers since 2010.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={FaFacebook} url="#" />
              <SocialIcon icon={FaInstagram} url="#" />
              <SocialIcon icon={FaTwitter} url="#" />
              <SocialIcon icon={FaPinterest} url="#" />
            </div>
          </div>
          
        
          
         
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-black">Contact Us</h4>
            <address className="text-black-400 not-italic">
              123 Burger Street<br />
              Foodville, FC 12345<br /><br />
              Phone: (123) 456-7890<br />
              Email: info@tastyburger.com
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-black-500  text-black">
          <p>© {new Date().getFullYear()} Tasty Burger. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
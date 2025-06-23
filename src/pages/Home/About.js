import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import image from "../../assets/hero/hero-1.jpg"; // local image import

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

// Section Header
const SectionHeader = ({ title, color = "text-red-600" }) => (
  <motion.h2
    className={`text-4xl md:text-5xl font-extrabold text-center ${color} font-serif mb-12`}
    variants={fadeInUp}
  >
    {title}
  </motion.h2>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string,
};

// Team Member Card
const TeamMember = ({ name, role, image }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-xl overflow-hidden flex-1 min-w-0 max-w-sm mx-auto"
    whileHover={{ y: -8, scale: 1.03 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    variants={fadeInUp}
  >
    <div className="w-full h-64 relative">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/300x300?text=Team+Member";
        }}
      />
    </div>
    <div className="p-6 text-center">
      <h3 className="text-xl font-bold text-gray-900">{name}</h3>
      <p className="text-red-600 font-medium">{role}</p>
    </div>
  </motion.div>
);

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

// Value Card
const ValueCard = ({ title, description }) => (
  <motion.div
    className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
    variants={fadeInUp}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="text-2xl font-semibold text-red-600 mb-4">{title}</h3>
    <p className="text-gray-600 text-lg">{description}</p>
  </motion.div>
);

ValueCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

// Team & Values Data
const teamMembers = [
  {
    name: "John Burger",
    role: "Founder",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Emma Frye",
    role: "Head Chef",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Mike Relish",
    role: "Manager",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
  },
];

const values = [
  {
    title: "Quality",
    description:
      "We source the freshest, locally-grown ingredients to craft burgers that burst with flavor.",
  },
  {
    title: "Passion",
    description:
      "Our love for burgers fuels our creativity, ensuring every bite is a delightful experience.",
  },
  {
    title: "Community",
    description:
      "We support local farmers and give back to our community, building a stronger neighborhood.",
  },
];

const AboutPage = () => {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="bg-gradient-to-b from-yellow-50 to-orange-100 min-h-screen font-sans">
      {/* Hero Section with Background */}
      <motion.section
        className="relative py-28 md:py-40 text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={staggerContainer}
        ref={heroRef}
      >
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-white">
          <motion.h1
            className="text-4xl md:text-6xl font-serif font-bold mb-6"
            variants={fadeInUp}
          >
            Welcome to Tasty Burger
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Savor the art of burgers crafted with passion, quality, and a sprinkle of love since 2010.
          </motion.p>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section
        className="py-20 px-4 md:px-16 lg:px-32"
        initial="hidden"
        animate={storyInView ? "visible" : "hidden"}
        variants={staggerContainer}
        ref={storyRef}
      >
        <SectionHeader title="Our Story" />
        <motion.div className="grid md:grid-cols-2 gap-12 items-center" variants={fadeInUp}>
          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              Tasty Burger began as a humble food truck, driven by John Burger's dream to redefine the burger experience. With fresh, local ingredients and a relentless pursuit of flavor, we quickly won hearts.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Now a cherished local chain, we stay true to our roots, handcrafting each burger with care. Our story is one of passion, quality, and community—join us in celebrating the joy of burgers!
            </p>
          </div>
          <motion.img
            src="/images/burger-prep.jpg"
            alt="Burger preparation"
            className="rounded-2xl shadow-2xl w-full h-auto"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="py-20 px-4 md:px-8 bg-red-700 text-white"
        initial="hidden"
        animate={teamInView ? "visible" : "hidden"}
        variants={staggerContainer}
        ref={teamRef}
      >
        <SectionHeader title="Meet Our Team" color="text-white" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-stretch"
            variants={staggerContainer}
          >
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="py-20 px-4 md:px-16 lg:px-32 bg-white"
        initial="hidden"
        animate={valuesInView ? "visible" : "hidden"}
        variants={staggerContainer}
        ref={valuesRef}
      >
        <SectionHeader title="Our Values" />
        <motion.div className="grid md:grid-cols-3 gap-8" variants={staggerContainer}>
          {values.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-24 text-center bg-yellow-400"
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        variants={staggerContainer}
        ref={ctaRef}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-serif font-bold text-red-700 mb-6"
          variants={fadeInUp}
        >
          Craving the Ultimate Burger?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-800 mb-10 max-w-2xl mx-auto"
          variants={fadeInUp}
        >
          Dive into the Tasty Burger experience—where every bite tells a story of flavor and passion.
        </motion.p>
        <motion.a
          href="/menu"
          className="inline-block bg-red-700 text-red px-10 py-4 rounded-full text-lg font-semibold hover:bg-red-800 transition duration-300"
          variants={fadeInUp}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Our Menu
        </motion.a>
      </motion.section>
    </div>
  );
};

export default AboutPage;

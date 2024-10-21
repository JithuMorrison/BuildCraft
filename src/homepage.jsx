// src/HomePage.js
import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import stack from './contentstackconfig'; // Import your Contentstack client
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import HexagonGraphic from './hexo';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';

const CONTENTSTACK_HEADER_CONTENT_TYPE = 'CONTENT TYPE UID'; // Replace with your actual content type
const CONTENTSTACK_SERVICES_CONTENT_TYPE = 'CONTENT TYPE UID'; // Replace with your actual services content type
const CONTENTSTACK_BLOG_CONTENT_TYPE = 'CONTENT TYPE UID'; // Replace with your actual blog content type
const CONTENTSTACK_ABOUT_ME_CONTENT_TYPE = 'CONTENT TYPE UID'; // Add your About Me content type

const HomePage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [headerData, setHeaderData] = useState({ title: '', leftImageUrl: '', rightImageUrl: '',FirstImageUrl:'',spaceImageUrl:'' });
  const [aboutMe, setAboutMe] = useState('');
  const [services, setServices] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await stack.ContentType(CONTENTSTACK_HEADER_CONTENT_TYPE).Query().toJSON().find();
        const data = response[0];
        const leftImageUrl = data[data.length-1].image.url; 
        const rightImageUrl = data[data.length-2].image.url;
        const FirstImageUrl = data[data.length-3].image.url;
        const spaceImageUrl = data[data.length-4].image.url;
        
        setHeaderData({
          title: data.title,
          leftImageUrl: leftImageUrl,
          rightImageUrl: rightImageUrl,
          FirstImageUrl:FirstImageUrl,
          spaceImageUrl:spaceImageUrl,
        });
      } catch (error) {
        console.error('Error fetching header data:', error);
      }
    };

    const fetchAboutMeData = async () => { // Add this function to fetch About Me data
      try {
        const response = await stack.ContentType(CONTENTSTACK_ABOUT_ME_CONTENT_TYPE).Query().toJSON().find();
        const data = response[0][0]; // Adjust based on your content structure
        setAboutMe(data.aboutme); // Assuming your About Me content type has a description field
      } catch (error) {
        console.error('Error fetching About Me data:', error);
      }
    };

    const fetchServicesData = async () => {
      try {
        const response = await stack.ContentType(CONTENTSTACK_SERVICES_CONTENT_TYPE).Query().toJSON().find();
        setServices(response[0]); // Adjust based on your content structure
      } catch (error) {
        console.error('Error fetching services data:', error);
      }
    };

    const fetchBlogPostsData = async () => {
      try {
        const response = await stack.ContentType(CONTENTSTACK_BLOG_CONTENT_TYPE).Query().toJSON().find();
        setBlogPosts(response[0]); // Adjust based on your content structure
      } catch (error) {
        console.error('Error fetching blog posts data:', error);
      }
    };

    fetchHeaderData();
    fetchAboutMeData(); // Call the new function here
    fetchServicesData();
    fetchBlogPostsData();
  }, []);

  const plans = [
    {
        name: "Free Version",
        price: "$0",
        features: [
            "Design without saving",
            "Max 2 designs",
            "No load option"
        ]
    },
    {
        name: "Standard Version",
        price: "$14",
        features: [
            "Save up to 10 designs",
            "Load saved designs",
            "Design without restrictions"
        ]
    },
    {
        name: "Pro Version",
        price: "$100",
        features: [
            "Unlimited designs",
            "Save and load options",
            "Full feature access"
        ]
    },
];

  return (
    <div className="home-container">
      <Header />

      <button className="toggle-button" onClick={toggleSidebar}>
        {isSidebarVisible ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
      </button>

      {isSidebarVisible && (
        <aside className="sidebaro">
          <h2>Dashboard</h2>
          <ul>
            <li><a href="/drag-drop">Create Design</a></li>
            <li><a href='/visuals'>Visuals</a></li>
            <li><a href="/info">Documentation</a></li>
            <li><a href="/blog">Latest Blog Posts</a></li>
          </ul>
        </aside>
      )}

      <div style={{display:'flex',marginTop:'250px'}}>
      <div style={{marginLeft:'60px',marginBottom:'50px'}}>
        <h1>BuildCraft: Craft Stunning Visuals</h1>
        <h2 style={{color:'white',fontSize:40,marginTop:'30px'}}>Unleash Your Creativity,</h2>
        <h2 style={{color:'#7c4dff',fontSize:40,marginTop:'-10px'}}>Design Like a Pro!</h2>
        <p style={{width:'900px',marginTop:'30px'}}>
        Create faster. Design smarter. Bring your creative ideas to life with Design Studio, the ultimate platform for building captivating visuals, UI designs, and custom graphics. From beginners to pros, our intuitive, AI-powered design tools make it easier than ever to design, personalize, and publish beautiful content. Whether it's social media graphics, presentations, or complete UI prototypes, let your vision shine with Design Studio — your creative partner for designing without limits.
        </p>
        </div>
        <img src={headerData.FirstImageUrl} alt="Swipe Image" style={{borderRadius:'50px',width:'400px',height:'320px',marginLeft:'150px',marginBottom:'100px'}} />
        </div>

        <div style={{display:'flex'}}>
        <img src={headerData.spaceImageUrl} alt="Swipe Image" style={{borderRadius:'50px',width:'500px',height:'500px',marginLeft:'70px',objectFit:'cover'}} />
        <HexagonGraphic/>
        </div>


      <main className="home-main" style={{marginTop:'100px'}}>
        {/* Header Section */}
        <div className="header-images">
          <img src={headerData.leftImageUrl} alt="Left Decorative" className="left-image" />
          <img src={headerData.rightImageUrl} alt="Right Decorative" className="right-image" />
        </div>

        {/* About Me Section */}
        <section className="about-section" id='about'>
          <div className="card about-card">
            <h2>About Me</h2>
            <div dangerouslySetInnerHTML={{ __html: aboutMe }}/>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/jithu-morrison-s/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.youtube.com/@JackOrganisation" target="_blank" rel="noopener noreferrer">YouTube</a>
              <a href="https://jithumorrison.github.io/" target="_blank" rel="noopener noreferrer">Website</a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services">
          <h2>Our Services</h2>
          <div className="services-container">
            {services.map((service, index) => (
              <div className="card service-card" key={service.id || index}>
                <h3 style={{color:'#7c4dff'}}>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="pricecontainer">
            <h1 style={{ color: 'white' }}>Pricing Plans</h1>
            <div className="pricecard-container">
                {plans.map((plan, index) => (
                    <div key={index} className="pricecard">
                        <h3 style={{ color: 'white' }}>{plan.name}</h3>
                        <h2 style={{ color: 'white' }}>{plan.price}</h2>
                        <ul className="pricefeatures-list">
                            {plan.features.map((feature, featureIndex) => (
                                <li key={featureIndex} style={{ color: 'white' }}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        {/* Blog Section */}
        <section id="blog">
          <h2>Latest Blog Posts</h2>
          <div className="blog-container">
            {blogPosts.slice(0, 3).map((post, index) => (
              <div className="card blog-card" key={post.id || index}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <div>
                    <img src={post.image.url} alt="blog" style={{borderRadius:'50px',width:'200px',height:'200px',objectFit:'cover'}} />
                </div>
                <div>
                  <Link to={`/${post.uid}`} className="read-more">Read More</Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;

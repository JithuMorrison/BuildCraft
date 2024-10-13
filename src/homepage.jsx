// src/HomePage.js
import React, { useState, useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import stack from './contentstackconfig'; // Import your Contentstack client

const CONTENTSTACK_HEADER_CONTENT_TYPE = 'homepageimages'; // Replace with your actual content type
const CONTENTSTACK_SERVICES_CONTENT_TYPE = 'services'; // Replace with your actual services content type
const CONTENTSTACK_BLOG_CONTENT_TYPE = 'blogpost'; // Replace with your actual blog content type
const CONTENTSTACK_ABOUT_ME_CONTENT_TYPE = 'aboutme'; // Add your About Me content type

const HomePage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [headerData, setHeaderData] = useState({ title: '', leftImageUrl: '', rightImageUrl: '' });
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
        const data = response[0][0];
        const leftImageUrl = data.image.url; 
        const rightImageUrl = data.image.url;
        
        setHeaderData({
          title: data.title,
          leftImageUrl: leftImageUrl,
          rightImageUrl: rightImageUrl,
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
        console.log(response[0]);
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

  return (
    <div className="home-container">
      <Header />

      <button className="toggle-button" onClick={toggleSidebar}>
        {isSidebarVisible ? 'Hide Menu' : 'Show Menu'}
      </button>

      {isSidebarVisible && (
        <aside className="sidebaro">
          <h2>Dashboard</h2>
          <ul>
            <li><a href="/drag-drop">Create Design</a></li>
            <li><a href="/info">Documentation</a></li>
            <li><a href="/blog">Latest Blog Posts</a></li>
          </ul>
        </aside>
      )}

      <main className="home-main">
        {/* Header Section */}
        <div className="header-images">
          <img src={headerData.leftImageUrl} alt="Left Decorative" className="left-image" />
          <img src={headerData.rightImageUrl} alt="Right Decorative" className="right-image" />
        </div>

        {/* About Me Section */}
        <section className="about-section">
          <div className="card about-card">
            <h2>About Me</h2>
            <div dangerouslySetInnerHTML={{ __html: aboutMe }}/>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.youtube.com/channel/yourchannel" target="_blank" rel="noopener noreferrer">YouTube</a>
              <a href="https://www.nexzjen.com" target="_blank" rel="noopener noreferrer">Website</a>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services">
          <h2>Our Services</h2>
          <div className="services-container">
            {services.map((service, index) => (
              <div className="card service-card" key={service.id || index}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog">
          <h2>Latest Blog Posts</h2>
          <div className="blog-container">
            {blogPosts.slice(0, 3).map((post, index) => (
              <div className="card blog-card" key={post.id || index}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <a href={`/blog/${post.id}`} className="read-more">Read More</a>
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

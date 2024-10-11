// src/HomePage.js
import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';

const HomePage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State to control sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
  };

  return (
    <div className="home-container">
      <Header />

      <button className="toggle-button" onClick={toggleSidebar}>
        {isSidebarVisible ? 'Hide Menu' : 'Show Menu'} {/* Button text based on state */}
      </button>

      {isSidebarVisible && ( // Render sidebar only when visible
        <aside className="sidebaro">
          <h2>Navigation</h2>
          <ul>
            <li><a href="/drag-drop">Create design</a></li>
            <li><a href="#services">Our Services</a></li>
            <li><a href="#blog">Latest Blog Posts</a></li>
          </ul>
        </aside>
      )}

      <main className="home-main">
        <section id="about">
          <h2>About Us</h2>
          <p>
            We are a team of passionate developers dedicated to building powerful and user-friendly applications.
          </p>
        </section>

        <section id="services">
          <h2>Our Services</h2>
          <p>
            We offer a range of services including web development, UI/UX design, and cloud solutions.
          </p>
        </section>

        <section id="blog">
          <h2>Latest Blog Posts</h2>
          <p>
            Check out our latest updates and articles to stay informed!
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;

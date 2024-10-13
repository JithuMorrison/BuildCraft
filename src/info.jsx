import React from 'react';

const InfoPage = () => {
  return (
    <div className="info-page">
      <h2>Welcome to Our Design Platform</h2>
      
      <section className="info-section">
        <h3>About This Website</h3>
        <p>
          Our website is a powerful design tool that allows users to create stunning visuals with ease. Whether you're a professional designer or a casual user, our platform provides the tools you need to bring your ideas to life. From designing eye-catching thumbnails to creating complete digital artworks, we cater to a wide range of design needs.
        </p>
      </section>

      <section className="info-section">
        <h3>Key Features</h3>
        <ul>
          <li>
            <strong>Thumbnail Design:</strong> Create captivating thumbnails for your videos or social media posts with our intuitive tools and templates.
          </li>
          <li>
            <strong>Customizable Templates:</strong> Choose from a variety of professionally designed templates that you can customize to suit your style.
          </li>
          <li>
            <strong>Easy Drag-and-Drop Interface:</strong> Our user-friendly interface allows you to easily add and arrange elements in your designs.
          </li>
          <li>
            <strong>Image Editing Tools:</strong> Enhance your images with built-in editing tools, including filters, text, and shapes.
          </li>
          <li>
            <strong>Save and Share:</strong> Once your design is complete, save it in various formats or share it directly on social media.
          </li>
          <li>
            <strong>Collaborative Features:</strong> Work with team members in real-time, allowing for seamless collaboration on projects.
          </li>
        </ul>
      </section>

      <section className="info-section">
        <h3>Getting Started</h3>
        <p>
          To start designing, simply create an account and log in. From there, you can access our design tools and templates. Explore our tutorials for tips on making the most out of our platform. Join our community of creators and start designing today!
        </p>
      </section>
      
      <section className="info-section">
        <h3>Contact Us</h3>
        <p>
          If you have any questions or need support, feel free to reach out to our customer service team through the contact page. We're here to help you with any inquiries or issues you may have.
        </p>
      </section>
    </div>
  );
};

export default InfoPage;

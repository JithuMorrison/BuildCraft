import React from "react";

const HexagonGraphic = () => {
  return (
    <div style={{display:'flex',gap:'70px', marginLeft:'70px'}}>
    <div className="card" style={{width:'550px'}}>
      <h1>Web UI Design Services</h1>
      <h2>Create, Customize, and Innovate</h2>
      <p>
        Build stunning web interfaces with our intuitive design platform. Use
        pre-built templates, or customize your design by uploading images or
        using a URL. Whether you're a professional designer or a beginner, our
        tools help you bring your vision to life.
      </p>
      <h3>Core Features</h3>
      <ul style={{color:'white',marginBottom:'20px'}}>
        <li>Design with ready-to-use templates or start from scratch</li>
        <li>Upload images or add them directly from a URL</li>
        <li>Customize your designs with easy drag-and-drop functionality</li>
        <li>Export your designs as images for immediate use</li>
        <li>Save your designs in JSON format for future editing</li>
      </ul>
      <p>
        Our platform is designed for creativity and flexibility. You can create
        professional-grade UI designs and export them in different formats to
        suit your needs.
      </p>
    </div>
    <div className="hex-container" style={{marginTop:'60px'}}>
      <div className="hexagon">
        <div className="inner-hex">
          <span className="label">BuildCraft</span>
        </div>
      </div>
      <div className="channel-label">Channel</div>
      {/* Add surrounding hexagons */}
      <div className="hexa1"><div className="hex1" /></div>
      <div className="hexa2"><div className="hex2" /></div>
      <div className="hexa3"><div className="hex3" /></div>
      <div className="hexa4"><div className="hex4" /></div>
      <div className="hexa5"><div className="hex5" /></div>
      <div className="hexa6"><div className="hex6" /></div>
    </div>
    </div>
  );
};

export default HexagonGraphic;

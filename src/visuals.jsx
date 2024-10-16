// Visuals.js
import React from 'react';
import { Link } from 'react-router-dom';

const Visuals = () => {
    const savedDesignsKey = 'MyDesigns';
    const savedDesigns = JSON.parse(localStorage.getItem(savedDesignsKey)) || [];

    return (
        <div style={styles.container}>
            <h1>Visuals</h1>
            <div style={styles.cardContainer}>
                {savedDesigns.map((designName) => (
                    <div key={designName} style={styles.card}>
                        <h3 style={{color:'white'}}>{designName}</h3>
                        <Link to={'/drag-drop'}>
                            <button  style={styles.button}>Open Design</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        marginLeft: '350px',
        width: '1000px',
        height: '785px',
        backgroundColor:'darkgray',
        borderRadius: '20px',
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        width: '200px',
        height: '200px',
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',          // Enable flexbox
        flexDirection: 'column',  // Arrange children in a column
        alignItems: 'center',     // Center horizontally
        justifyContent: 'center',  // Center vertically
        backgroundColor:'gray',
    },
    button: {
        position:'relative',
        backgroundColor: '#555', // Dark button background
        color: 'white',           // White text for button
        border: 'none',           // Remove border
        borderRadius: '5px',      // Rounded corners
        padding: '10px 15px',     // Padding for the button
        marginLeft:'130px',
        width:'130px',
        cursor: 'pointer',        // Pointer cursor on hover
        transition: 'background-color 0.3s', // Smooth transition for hover
    },
};


export default Visuals;

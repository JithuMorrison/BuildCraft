import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import React from 'react';
import { Link } from 'react-router-dom';

const Visuals = () => {
    const savedDesignsKey = 'MyDesigns';
    const savedDesigns = JSON.parse(localStorage.getItem(savedDesignsKey)) || [];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>My Designs</h1>
                <Link to="/drag-drop" style={styles.newDesignButton}>
                    + New Design
                </Link>
            </div>
            
            {savedDesigns.length === 0 ? (
                <div style={styles.emptyState}>
                    <p style={styles.emptyText}>No designs saved yet</p>
                    <Link to="/drag-drop" style={styles.emptyButton}>
                        Create your first design
                    </Link>
                </div>
            ) : (
                <div style={styles.cardContainer}>
                    {savedDesigns.map((designName) => (
                        <div key={designName} style={styles.card}>
                            <div style={styles.cardThumbnail}></div>
                            <h3 style={styles.cardTitle}>{designName}</h3>
                            <div style={styles.cardActions}>
                                <Link to={`/drag-drop?design=${encodeURIComponent(designName)}`} style={styles.openButton}>
                                    Open Design
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '40px',
        marginLeft: '100px',
        marginTop: '30px',
        minHeight: '100vh',
        borderRadius: '24px', // Rounded corners for the entire container
        width: '1500px',
        backgroundColor: '#f8fafc',
        transition: 'background-color 0.3s ease'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '50px',
        background: 'linear-gradient(to right, #4f46e5, #6366f1)',
        padding: '24px 32px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.1)'
    },
    title: {
        fontSize: '36px',
        color: 'white',
        fontWeight: '700',
        margin: 0,
        letterSpacing: '-0.025em'
    },
    newDesignButton: {
        backgroundColor: 'white',
        color: '#4f46e5',
        padding: '14px 28px',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '16px',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '2px solid transparent',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        textAlign: 'center',
        background: 'white',
        borderRadius: '24px',
        padding: '48px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
    },
    emptyText: {
        fontSize: '24px',
        color: '#64748b',
        marginBottom: '24px',
        fontWeight: '500'
    },
    emptyButton: {
        backgroundColor: '#4f46e5',
        color: 'white',
        padding: '16px 32px',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '18px',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)'
    },
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '32px',
        padding: '16px'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        border: '1px solid #e2e8f0',
        position: 'relative',
        cursor: 'pointer'
    },
    cardThumbnail: {
        height: '200px',
        backgroundColor: '#f1f5f9',
        backgroundImage: 'linear-gradient(135deg, #e2e8f0 0%, #f8fafc 100%)',
        position: 'relative',
        overflow: 'hidden'
    },
    cardTitle: {
        padding: '20px',
        margin: 0,
        color: '#1e293b',
        fontSize: '20px',
        fontWeight: '600',
        borderBottom: '1px solid #e2e8f0'
    },
    cardActions: {
        padding: '16px 20px',
        background: '#f8fafc'
    },
    openButton: {
        display: 'block',
        backgroundColor: '#4f46e5',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        textDecoration: 'none',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: '16px',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px -1px rgba(79, 70, 229, 0.2)'
    }
};

export default Visuals;
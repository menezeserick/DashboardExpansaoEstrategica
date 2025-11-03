import React from 'react';
import './Footer.css'; // Assuming you might want to style the footer

const Footer = () => {
    return (
        <footer>
            <p>&copy; {new Date().getFullYear()} My React Netlify App. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
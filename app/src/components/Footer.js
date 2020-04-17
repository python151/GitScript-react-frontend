import React from 'react';

let Footer;
export default Footer = props => (
    <nav className="footer text-center">
        <h1>GitScript</h1>
        <ul>
            <a href="/Home">
                <li>
                    <span>Admin-Login</span>
                </li>
            </a>
            <a href="/login">
                <li>
                    <span>About the developer</span>
                </li>
            </a>
            <a href="/SignUp">
                <li>
                    <span>API</span>
                </li>
            </a>
            <a href="/SignUp">
                <li>
                    <span>About our product</span>
                </li>
            </a>
            <a href="/SignUp">
                <li>
                    <span>Our mission</span>
                </li>
            </a>
        </ul>
    </nav>
);
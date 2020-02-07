import React from 'react';
import { Link } from "react-router-dom";
import "../../../styles/components/footer.css";

const Footer = props => {


    return(<>
    <div className="container-fluid footer-custom">
        <div className="container">
            <div className="d-flex justify-content-around align-items-center">
                <div className="w-50">
                    <Link to="/"></Link>
                </div>
                <div className="d-flex justify-content-around w-50">
                    <Link to="/">Mentions légales</Link>
                    <Link to="/">Politique de confidentialité</Link>
                    <Link to="/">QWIZ - 2020</Link>
                </div>
            </div>
        </div>
        
    </div>
    </>)
}

export default Footer;
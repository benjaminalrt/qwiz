import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "../../../styles/components/header.css";


const Header = props => {


    return(<>
    <div className="container-fluid header-custom">
        <div className="container">
            <div className="d-flex justify-content-around align-items-center">
                <div className="w-50">
                    <Link to="/">[IMAGE QWIZ]</Link>
                </div>
                <div className="d-flex justify-content-around w-50">
                    <Link to="/">Home</Link>
                    <Link to="/play">Play</Link>
                    <Link to="/create">Create</Link>
                    <Link to="/profile">Profile</Link>
                </div>
            </div>
        </div>
        
    </div>
    </>)
}

export default Header;
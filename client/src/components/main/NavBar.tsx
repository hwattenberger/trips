import { useApolloClient } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import NavBarLinks from './NavBarLinks';

import './NavBar.css';

interface NavBarProps {
    token: string | null,
    setToken: React.Dispatch<React.SetStateAction<string | null>>
}

const NavBar: React.FC<NavBarProps> = ({ token, setToken }) => {
    const [showLink, setshowLinks] = useState(false);
    const client = useApolloClient();

    function logout() {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    }

    function setShow() {
        setshowLinks(!showLink);
    }

    function linkClassName() {
        if (!showLink) return "hideDiv";
        return "showDiv"
    }

    return (
        <div id="navbar">
            <div id="navbar-logo">
                <Link to="/">Trips</Link>
            </div>
            <div className="nav-ham" onClick={setShow}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <NavBarLinks token={token} showLink={showLink} />
            <div id="navbar-login" className={linkClassName()}>
                {!token && <Link to="/login"><Button variant="outlined">Login</Button></Link>}
                {!token && <Link to="/register"><Button variant="outlined">Create Account</Button></Link>}
                {token && <Button variant="outlined" onClick={logout}>Logout</Button>}
            </div>
        </div>
    )
}

export default NavBar;
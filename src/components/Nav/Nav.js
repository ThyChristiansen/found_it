import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOut from '../LogOutButton/LogOutButton';

import './Nav.css';


const Nav = (props) => (
    <div className="nav">
       
        <div>
            <Link className="nav-link" to="/home">
                {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
                {props.user.id ? 'Home' : 'Login / Register'}
            </Link><br />

            {/* Show the link to the info page and the logout button if the user is logged in */}
            {props.user.id && (
                <>
                    <Link className="nav-link" to="/scanner">Scanner </Link><br />

                </>
            )}
            {/* Always show this link since the about page is not protected */}
            <Link className="nav-link" to="/about">About</Link><br />
            {props.user.id && (
                <>
                    <LogOut className="logOut-btn" />
                </>
            )}
        </div>
    </div>
);


const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(Nav);

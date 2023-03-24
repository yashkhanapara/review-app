import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div className='navbar bg-light'>
            <div className='nav-menus'>
                <div className='nav-item'>
                    <NavLink to='/'>Add Review</NavLink>
                </div>
                <div className='nav-item'>
                    <NavLink to='/review-list'>View All Review</NavLink>
                </div>
            </div>
        </div>
    );
};

export default NavBar;

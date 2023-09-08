import React from 'react';
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <div className='bg-stone-500 py-5 px-4 mx-auto'>
            <div className='flex items-center justify-between'>
                <Link to="/">
                   <span className='font-semibold text-xl text-neutral-900 tracking-wide'>Email + Password</span>
                </Link>
                <ul className='flex items-center space-x-5 '>
                    <li>
                        <NavLink to="/"
                        className={({isActive}) => (isActive ? 'active' : 'default')}
                        >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login"
                        className={({isActive}) =>(isActive ? 'active' : 'default')}
                        >Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register"
                        className={({isActive}) =>(isActive ? 'active' : 'default')}
                        >Register</NavLink>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default Header;
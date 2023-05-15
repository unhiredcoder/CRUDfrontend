import React from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Nav() {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  function logout() {
    localStorage.clear();
    navigate('/signup');
  }

  return (
    <>
      <li type='none'>
        <NavLink className="toggle" onClick={toggleMenu}>
          {isOpen ? <ion-icon name="close-outline"></ion-icon> : <ion-icon name="menu-outline"></ion-icon>}
        </NavLink>
      </li>
      {auth ? (
        <ul className={`ulstyle2 ${isOpen ? 'open' : ''}`}>
          <li><NavLink className='link' to="/" onClick={handleLinkClick}>Product</NavLink></li>
          <li><NavLink className='link' to="/add" onClick={handleLinkClick}>Add</NavLink></li>
          <li><NavLink className='link' to="/update" onClick={handleLinkClick}>Update</NavLink></li>
          <li>
            <NavLink onClick={logout} className='link' to="/signup">
              Logout [{JSON.parse(auth).name}]
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className='ulstyle2'>
          <li><NavLink className='link' to="/signup" onClick={handleLinkClick}>Sign Up</NavLink></li>
          <li><NavLink className='link' to="/login" onClick={handleLinkClick}>Login</NavLink></li>
        </ul>
      )}
    </>
  );
}

export default Nav;

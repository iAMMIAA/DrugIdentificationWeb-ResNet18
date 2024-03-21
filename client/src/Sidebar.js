// Sidebar.js
import React from 'react';
import './css/Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar({ changePage }) {
  return (
    <nav>
      <ul>
        <li><button onClick={() => changePage('home')}>Home</button></li>
        <li><button onClick={() => changePage('settings')}>Settings</button></li>
        <li><button onClick={() => changePage('about')}>About</button></li>
        {/* <li><Link to="/home">Home</Link></li> */}
      </ul>
    </nav>
  );
}

export default Sidebar;

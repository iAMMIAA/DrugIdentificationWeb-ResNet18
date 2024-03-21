import axios from 'axios';
import './css/User.css';
import './css/ProfileUser.css';
import './css/layoutRight.css';
import Home from './Home';
import Custom from './Update'
import Profile from './Profile';
import zyz from './pictures/zyz.jpg';
import Prescription from './Prescription';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

function Settings() {
  return (
    <div style={{backgroundColor: 'blue'}}>
      <h1>Welcome to the Settings Page</h1>
    </div>
  );
}
function About() {
  return (
    <div style={{backgroundColor: 'gray'}}>
      <h1>Welcome to the About Page</h1>
    </div>
  );
}

function AppUser() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        'Authorization': `Token ${token}`,
      }
    };
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/logout/', {}, axiosConfig);
      if (response.status === 200) {
        localStorage.removeItem('token');
        window.location.href='/';
      } else {
        console.error('Đăng xuất không thành công');
      }
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (!userData) {
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        Authorization: `Token ${token}`,
      }
    };
    axios.get('http://127.0.0.1:8000/api/update_profile/', axiosConfig)
      .then((response) => {
        if(response.status == 200) {
          const userData = response.data;
          if(userData.fullname == null || userData.fullname === "") 
            {userData.fullname = userData.username;}
          setUserData(userData);
        } else {console.error('Loi khi lay thong tin nguoi dung');}
      }).catch((error) => {
        console.error('Loi khi lay thong tin nguoi dung.', error);
      });
    }
  }, [userData]); 

  return (
    <Router>
      <div className="App">
        <content className="App-content">
            <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
              <div class="top">
                  <div class="logo">
                      <i class="fa fa-hospital fa-2x"></i>
                      <span class="banner">PILL IDENTIFIER</span>
                  </div>
                  <i class="bx bx-menu" id="btn" onClick={toggleSidebar}></i>
              </div>
              <div class="user">
                  <img src={zyz} alt="avt-user" class="user-img"/>
                  {userData && (<p class="bold">{userData.fullname}</p>)}                  
              </div>
              <ul class='test'>
                <li>
                    <Link className='a' to="/user" id="btn-Home">
                        <i class="bx bx-home"></i>
                        <span class="nav-item">Home</span>
                    </Link>
                    <span class="tooltip">Home</span>
                </li>
                <li>
                    <Link className='a' to="/user/prescription" id="btn-Prescription">
                        <i class="fa fa-pills"></i>
                        <span class="nav-item">Prescription</span>
                    </Link>
                    <span class="tooltip">Prescription</span>
                </li>
                <li>
                    <Link className='a' to="/user/settings" id="btn-Settings">
                        <i class="bx bx-cog"></i>
                        <span class="nav-item">Settings</span>
                    </Link>
                    <span class="tooltip">Settings</span>
                </li>
                <li>
                    <Link className='a' to="/user/about" id="btn-About">
                        <i class="bx bxs-info-circle"></i>
                        <span class="nav-item">About</span>
                    </Link>
                    <span class="tooltip">About</span>
                </li>
              </ul>
            </div>
            <div className='mainContent'>
              <div className='centerContent'>
                <div className='topContent'>
                  <p>Pill Indentifier</p>
                </div>
                <div className={`primary-content ${sidebarActive ? 'active' : ''}`} id="primary-content">
                  <Switch>
                    <Route path="/user" exact component={Home} />
                    <Route path="/user/prescription" component={Prescription} />
                    <Route path="/user/settings" component={Settings} />
                    <Route path="/user/about" component={About} />
                    <Route path="/user/profile" component={Profile} />
                    <Route path="/user/custom" component={Custom} />
                  </Switch>
                </div>
              </div>
              <div className='layoutRight'>
                <div className='topLayoutRight'>
                  <div className="btnGroup">
                    <button className="btn1" type="button" id='nameUser'>
                    {userData && (
                      <Link to='/user/profile' className="dropdown-item" href="#">{userData.fullname}</Link>
                    )}
                    </button>
                    <button className="btn2" type="button" id='iconDropdown' onClick={toggleDropdown}>
                      <span className="visually-hidden">Toggle Dropdown</span>
                    </button>
                  </div>
                  <ul id='dropdownMenu' className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                      <li><Link to='/user/custom' className="dropdown-item" href="#">Custom</Link></li>
                      <li><Link to='/user/profile' className="dropdown-item">Profile</Link></li>
                      <li><button type='button' className="dropdown-item" onClick={handleLogout}>Log Out</button></li>
                  </ul>
                </div>
                <div className='centerLayoutRight'>
                </div>
                <div className='lastLayoutRight'></div>
              </div>
            </div>
        </content>        
      </div>
    </Router>
  );
}

export default AppUser;

import React, { useState, useEffect } from 'react';
import './css/User.css';
import './css/Home.css';
import './css/Prescription.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import axios from 'axios';
import img2 from './pictures/img2.png';
import img3 from './pictures/img3.png';
import img4 from './pictures/img4.png';

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
        <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
          <div class="logo">
              <span class="banner">PILL IDENTIFIER</span>
          </div>
          <div className='menuBar'>
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
          <div className='userName'>
            <span>ZhangZeYu</span>
          </div>
        </div>
        <content className="App-content">
          <div className='mainContent'>
              <div className={`primary-content ${sidebarActive ? 'active' : ''}`} id="primary-content">
                <div className='headerMainContent'>
                  <p className='nameApp'>Pill Identifier</p>
                  <div className='searchBar'></div>
                </div>
                {/* <div className='searchBar'>
                  <form className='formSearch'>
                      <input class="inputSearch" type="text" id="search" />
                  </form>
                </div> */}
                <div className='container'>
                    <div className='card1'>
                      <img src={img2} />                      
                      <div className='info'>
                        <h2>Don thuoc ngay dau</h2>
                        <p className='line1'>Day la thuoc duoc kham ngay 19/9/2023. Benh duoc du doan la ung thu</p>
                        <p className='line2'>Bac si dieu tri: ZhuZhiXin</p>
                      </div>
                    </div>
                    <div className='card2'>
                      <img src={img4} />                      
                      <div className='info'>
                        <h2>Don thuoc ngay dau</h2>
                        <p className='line1'>Day la thuoc duoc kham ngay 19/9/2023. Benh duoc du doan la ung thu</p>
                        <p className='line2'>Bac si dieu tri: ZhuZhiXin</p>
                      </div>
                    </div>
                    <div className='card3'>
                      <img src={img3} />                      
                        <div className='info'>
                          <h2>Don thuoc ngay dau</h2>
                          <p className='line1'>Day la thuoc duoc kham ngay 19/9/2023. Benh duoc du doan la ung thu</p>
                          <p className='line2'>Bac si dieu tri: ZhuZhiXin</p>
                        </div>
                    </div>
                </div>
              </div>
              <div className='layoutRight'>
              </div>
          </div>
        </content> 
      </div>
    </Router>
  );
}

export default AppUser;

import React, { useState, useEffect } from 'react';
import './css/User.css';
import './css/ProfileUser.css';
import axios from 'axios';
import zyz from './pictures/zyz.jpg';

function Profile() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Chỉ gửi yêu cầu GET khi userData chưa được lấy
    if (!userData) {
      //Gửi yêu cầu lấy thông tin người dùng khi trang được truy cập đến
    const token = localStorage.getItem('token');
    const axiosConfig = {
      headers: {
        Authorization: `Token ${token}`,
      }
    };
    axios.get('http://127.0.0.1:8000/api/update_profile/', axiosConfig)
      .then((response) => {
        if(response.status == 200) {
          setUserData(response.data);
        } else {console.error('Loi khi lay thong tin nguoi dung');}
      }).catch((error) => {
        console.error('Loi khi lay thong tin nguoi dung.', error);
      });
    }
  },[userData]);

  return (
    <div className='profileUser'>
      <div className='layoutSidebar'>
        <div className='avaUser'>
          <img src={zyz} alt="avt-user" class="user-img"/>
        </div>
        <div className='nameUser'>User name</div>
      </div>
      <div className='layoutMain'>
        <div class="info-container">
          <h1>Thông Tin Cá Nhân</h1>
          {userData && (
            <table class="table">
            <tbody class="table-group-divider">
              <tr>
                <th scope="row">Full name</th>
                <td>{userData.fullname}</td>
              </tr>
              <tr>
                <th scope="row">Gender</th>
                <td colspan="2">{userData.gender}</td>
              </tr>
              <tr>
                <th scope="row">Age</th>
                <td>{userData.age}</td>
              </tr>
              <tr>
                <th scope="row">Profession</th>
                <td colspan="2">{userData.profession}</td>
              </tr>
              <tr>
                <th scope="row">Location</th>
                <td colspan="2">{userData.location}</td>
              </tr>
            </tbody>
          </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile;





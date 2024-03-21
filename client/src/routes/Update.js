import React, { useState, useEffect } from 'react';
import './css/User.css';
import './css/Custom.css';
import './css/ProfileUser.css';
import axios from 'axios';
import zyz from './pictures/zyz.jpg';

function Custom(){
    const [fullname, setFullname] = useState(''); // Thêm giá trị ban đầu là một chuỗi rỗng
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [profession, setProfession] = useState('');
    const [location, setLocation] = useState('');
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      const axiosConfig = {
        headers: {
          Authorization: `Token ${token}`,
        }
      };
  
      axios.get('http://127.0.0.1:8000/api/upload_profile', axiosConfig)
        .then((response) => {
          const userData = response.data;
          setFullname(userData.fullname);
          setGender(userData.gender);
          setAge(userData.age);
          setProfession(userData.profession);
          setLocation(userData.location);
        }). catch((error) => {
          console.error('Error when taking the user information', error);
        })
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const token = localStorage.getItem('token');
      const axiosConfig = {
        headers: {
          Authorization: `Token ${token}`,
        }
      };
  
      const userDataToUpdate = {
        fullname: fullname,
        gender: gender,
        age: age,
        profession: profession,
        location: location,
      };
  
      try {
        const response = await axios.put('http://127.0.0.1:8000/api/update_profile/', userDataToUpdate, axiosConfig);
        if (response.status === 200) {
          console.log('Cập nhật thông tin thành công.');
        } else {
          console.error('Cập nhật thông tin không thành công.');
        }
      } catch (error) {
        console.error('Lỗi khi cập nhật thông tin:', error);
      }
    };
    return(
      <div className='contentProfile'>
        <div className='updateProfile'>
          <div className='headerUpdateProfile'>
            {/* <div className='background-image'></div> */}
            {/* <div className='avatar'></div>  */}
            <img className='avatar' src={zyz}></img>
          </div>
          <form className='formUpdateProfile' onSubmit={handleSubmit}>
            <div class="mb-3">
              <p for="exampleInputEmail1" class="form-label">Fullname:</p>
              <input class="form-control" type="text" id="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)}/>
            </div>
            <div class="mb-3">
              <p for="exampleInputEmail1" class="form-label">Gender:</p>
              <input class="form-control" type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}/>
            </div>
            <div class="mb-3">
              <p for="exampleInputEmail1" class="form-label">Age:</p>
              <input class="form-control" type="text" id="age" value={age} onChange={(e) => setAge(e.target.value)}/>
            </div>
            <div class="mb-3">
              <p for="exampleInputEmail1" class="form-label">Profession:</p>
              <input class="form-control" type="text" id="profession" value={profession} onChange={(e) => setProfession(e.target.value)}/>
            </div>
            <div class="mb-3">
              <p for="exampleInputEmail1" class="form-label">Location:</p>
              <input class="form-control" type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)}/>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
          </form>
          
        </div>
        
      </div>
    )
}

export default Custom;

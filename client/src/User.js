import React, { useState } from 'react';
import './css/App.css';
import './css/Home.css';
import './pictures/zyz.jpg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import zyz from './zyz.jpg';

function User() {

}

function Home() {
  const [file, setFile] = useState(null);
  const [drugName, setDrugName] = useState('');
  const [drugImage, setDrugImage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setDrugImage(URL.createObjectURL(event.target.files[0]));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append('image', file);

  //   axios.post('http://127.0.0.1:8000/api/create/', formData)
  //     .then((response) => {
  //       const drug = response.data;
  //       const idDrug = drug.idDrug;
  //       // const fileImages = drug.picture;
  //       // const linkImage = `http://127.0.0.1:8000${fileImages}/`;

  //       // setDrugImage(linkImage);

  //       axios.get(`http://127.0.0.1:8000/api/detail/${idDrug}/`)
  //         .then((response) => {
  //           const drug = response.data;
  //           setDrugName(drug.name);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const uploadImage = () => {
    const formData = new FormData();
    formData.append('image', file);

    axios.post('http://127.0.0.1:8000/api/create/', formData)
      .then((response) => {
        const drug = response.data;
        const idDrug = drug.idDrug;
        const fileImages = drug.picture;
        const linkImage = `http://127.0.0.1:8000${fileImages}/`;

        setDrugImage(linkImage);

        axios.get(`http://127.0.0.1:8000/api/detail/${idDrug}/`)
          .then((response) => {
            const drug = response.data;
            setDrugName(drug.name);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCheck = (event) => {
    event.preventDefault();
    uploadImage(); // Gọi hàm uploadImage để gửi ảnh lên máy chủ và hiển thị kết quả
  };
  
  return (
      <div className='Home'>
        <div class = "uploadImage">
            {/* <form class="drugForm" id="drugForm" encType="multipart/form-data" onSubmit={handleSubmit}> */}
            <form class="drugForm" id="drugForm" encType="multipart/form-data">
                {/* <input type="file" id="imageInput" name="image" onChange={handleFileChange} /><br/><br/> */}
                <div class="input-group mb-3">
                  <input type="file" class="form-control" id="imageInput" name="image" onChange={handleFileChange} />
                  <label class="input-group-text" for="inputGroupFile02" onSubmit={uploadImage}>Upload</label>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <img id="drugImage" src={drugImage} alt="Drug" />
                </div><br />
            </form>
            <button type="button" class="btn btn-primary" onClick={handleCheck}>Check</button>
        </div>
        <div className="result">
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <p id="decor"><h1 id="result">The medication is: {drugName}</h1></p>
          </div>
        </div>
      </div>
  );
}

function Prescription() {
  return (
    <div style={{backgroundColor: 'pink'}}>
      <h1>Welcome to the Prescription Page</h1>
    </div>
  );
}

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

function App() {
  const [sidebarActive, setSidebarActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <h2>
            <a href="#" className="logo">
              LOGO
            </a>
          </h2>
          <div className="namePage">
            <h1>PILL IDENTIFIER</h1>
          </div>
          <label htmlFor="check">
            <i className="fas fa-bars menu-btn"></i>
          </label>
        </header>
        
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
                  <p class="bold">Zhang Ze Yu</p>
              </div>
              <ul  class='test'>
                <li>
                    <Link className='a' to="/home" id="btn-Home">
                        <i class="bx bx-home"></i>
                        <span class="nav-item">Home</span>
                    </Link>
                        <span class="tooltip">Home</span>
                </li>
                <li>
                    <Link className='a' to="/prescription" id="btn-Prescription">
                        <i class="fa fa-pills"></i>
                        <span class="nav-item">Prescription</span>
                    </Link>
                        <span class="tooltip">Prescription</span>
                </li>
                <li>
                    <Link className='a' to="/settings" id="btn-Settings">
                        <i class="bx bx-cog"></i>
                        <span class="nav-item">Settings</span>
                    </Link>
                        <span class="tooltip">Settings</span>
                </li>
                <li>
                    <Link className='a' to="/about" id="btn-About">
                        <i class="bx bxs-info-circle"></i>
                        <span class="nav-item">About</span>
                    </Link>
                    <span class="tooltip">About</span>
                </li>
              </ul>
            </div>
            
            <div className={`primary-content ${sidebarActive ? 'active' : ''}`} id="primary-content">
              <Route path="/" exact component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/prescription" component={Prescription} />
              <Route path="/settings" component={Settings} />
              <Route path="/about" component={About} />
            </div>
        </content>
      </div>
    </Router>
  );
}

export default App;

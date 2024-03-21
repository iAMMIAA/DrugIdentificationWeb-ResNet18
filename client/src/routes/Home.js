import './css/Home.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import bieu3 from './pictures/bieu3.jpg';

function Home() {
    const [file, setFile] = useState(null);
    const [drugName, setDrugName] = useState('');
    const [drugImage, setDrugImage] = useState('');
  
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
      setDrugImage(URL.createObjectURL(event.target.files[0]));
    };
  
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
              <form class="drugForm" id="drugForm" encType="multipart/form-data">
                  <div class="input-group mb-3">
                    <input type="file" class="form-control" id="imageInput" name="image" onChange={handleFileChange} />
                    <label class="input-group-text" for="inputGroupFile02" onSubmit={uploadImage}>Upload</label>
                  </div>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  </div><br />
              </form>
              <button type="button" id="btnCheck" class="btn btn-primary" onClick={handleCheck}>Check</button>
          </div>
          <div className="result">
            <div className='square1' style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              {/* <p id="decor"><h1 id="result">{drugName}</h1></p> */}
              <img src={bieu3}></img>
            </div>
            <div className='rectangle'>
              <div className='square2'>
                <p className='line1'>Drug predicted:</p>
                <p id="decor"><h2 className='resultDrug' id="result">{drugName}</h2></p>
                {/* <p className='line1'>Name and amount of medication the patient must task:</p>
                <p>One: medication</p>
                <p>One: antibiotics</p>
                <p>Two: cough mixture</p>
                <p>One: aspirin </p> */}
              </div>
              <div className='square3'><img className='drugImage' id="drugImage" src={drugImage} alt="Drug" /></div>
            </div>
          </div>
        </div>
    );
  }
export default Home;
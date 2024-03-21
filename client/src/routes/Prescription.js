import './css/Prescription.css';
import React, { useState, useEffect } from 'react';
import img2 from './pictures/img2.png';
import img3 from './pictures/img3.png';
import img4 from './pictures/img4.png';

function Prescription() {
  return (
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
  );
}

export default Prescription;
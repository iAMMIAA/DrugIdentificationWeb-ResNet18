import React, { useState } from 'react';
import './css/Intro.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

function AppIntro() {

  const [isSignInActive, setIsSignInActive] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //Kiem soat trang thai dang nhap
  const [token, setToken] = useState('');

  const handleSignInClick = () => {
    setIsSignInActive(true);
  };
  const handleLogInClick = () => {
    setIsSignInActive(false);
  }
  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    const signUp = new FormData(e.target);
    axios.post('http://127.0.0.1:8000/api/register/', signUp)
        .then((response) => { 
            window.location.href = 'user';
        })
        .catch((error) => {console.error(error);});
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const signIn = new FormData(e.target);
    axios.post('http://127.0.0.1:8000/api/login/', signIn)
        .then((response) => { 
            localStorage.setItem('token', response.data.token);
            setToken(response.data.token);
            window.location.href = 'user';
            setIsLoggedIn(true);
        })
        .catch((error) => {console.error(error);});
  };

  return (
    <section>
        <headerIntro>
            <h2><a href="#" class = "logo">LOGO</a></h2>
            <div class="navigation">
                <a href="#" id="btn-SignIn" onClick={handleSignInClick}>Sign Up</a>
                <a href="#" id="btn-LogIn" onClick={handleLogInClick}>Login</a>
                <a href="#">Forgot password</a>
            </div>
            <label for="check">
                <i class="fas fa-bars menu-btn"></i>
                <i class="fas fa-times close-btn"></i>
            </label>
        </headerIntro>
        <main-content>
            <div class="body">
                <div class="content">
                    <div class="info">
                        <h2>PILL <br/><span>IDENTIFIER!</span></h2>
                        <p>Using drugs is a necessity, in order to support patients with decline or treatment of diseases. However, the use of drugs does not always bring complete benefits, for example: drug overdose, inappropriate use of drugs, abuse of drugs, ... and cannot be. not to mention the wrong medication. According to the World Health Organization (WHO), one-third of all drug-related deaths are caused by patient misuse. Therefore, there is a need for applications to assist in determining the right drugs for patients. Based on images, having an app help identify medications can also help reduce a patient's time and effort in finding drug information, and assist healthcare professionals in making informed decisions. accurate diagnosis and treatment.</p>
                        <a href="#" class="info-btn">More Infomation</a>
                    </div>
                </div>
                <div class={`form-signin ${isSignInActive ? 'active' : ''}`}>
                    <form class="registrationForm" id="registrationForm" enctype="multipart/form-data" onSubmit={handleRegistrationSubmit}>
                        <input type="text" id="username" placeholder="Username" name="username" /><br/><br/>
                        <input type="email" id="email" placeholder="Email" name="email" /><br/><br/>
                        <input type="password" id="password" placeholder="Password" name="password" /><br/><br/>
                        <button type="submit">Register</button> 
                    </form>
                </div>
                <div class={`login ${isSignInActive ? '' : 'active'}`}>   
                    <form id="login-Form" class="login-Form" enctype="multipart/form-data" onSubmit={handleLoginSubmit}>
                        <input type="text" id="username" placeholder="Username" name="username" /><br/><br/>
                        <input type="password" id="password" placeholder="Password" name="password" /><br/><br/>
                        <button type="submit">Login</button><br/><br/>
                    </form>
                </div>
            </div>
            <div class="media-icons">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
            </div>
        </main-content>        
    </section>
  );
}

export default AppIntro;

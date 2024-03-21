import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'boxicons/css/boxicons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const root = document.getElementById('root');
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   root
// );


//1
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<App />} />
//         <Route path='user' element={<User />} />
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );


//2
//Dinh nghia 1 route tuong duong dinh nghia 1 url
// import AppIntro from './routes/Intro';
// import AppUser from './routes/User';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Router>
//         <Route path='/' Component={AppIntro} />
//         <Route path='/use' Component={AppUser} />
//           {/* <Route path='user' element={<User />} /> */}
//         {/* </Route> */}
//       </Router>
//     </BrowserRouter>
//   </React.StrictMode>
// );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

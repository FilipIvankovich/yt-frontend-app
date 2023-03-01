import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/App';
import Login from './components/Login/Login';
import { BrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <App />
  </BrowserRouter>
);

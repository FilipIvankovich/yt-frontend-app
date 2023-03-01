import './Login.css';
import loginTopBlob from '../../images/login/loginTopBlob.png';
import loginBrBlob from '../../images/login/loginBrBlob.png';
import loginBmBlob from '../../images/login/loginBmBlob.png';
import { Logo } from '../logo';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LoginButton } from './LoginButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  //558317733678-ge9keq51cqbir42tabo39di3vvv27fgv.apps.googleusercontent.com

  const [userData, setUserData] = useState('');
  const navigate = useNavigate();

  const passData = (data) => {
    setUserData(data);
  }

  useEffect(() => {
    if(userData != ''){
      localStorage.setItem('user', userData.given_name);
      navigate('/search', {state: {searchPhrase: ''}});
    }
  });

  return (
    
    <div className='login'>
      
      <div className='logo'><Logo/></div>
      <div className='siteTitle'>
        <div>
          <p className='titleDesc'>One platform for all your videos</p>
          <h1 className='title'>Learn. Discover. Create.</h1>
          <GoogleOAuthProvider clientId='558317733678-ge9keq51cqbir42tabo39di3vvv27fgv.apps.googleusercontent.com'>
            <LoginButton passData={passData}/>
          </GoogleOAuthProvider>
        </div>
      </div>
      <img alt='' src={loginTopBlob} className='top-blob'/>
      <img alt='' src={loginBrBlob} className='br-blob'/>
      <img alt='' src={loginBmBlob} className='bm-blob'/>
      <div className='footer'>
        <div className='copyright'>
          <p>Copyright © 2023 ZoneV. All Rights Reserved.</p>
        </div>
        <div className='docsFooter'>
          <p>Terms of Use</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import g from '../../images/login/G.png';
import './Login.css';

export const LoginButton = ({passData}) => {

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            fetch("https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + tokenResponse.access_token)
            .then(res => res.json())
            .then(
                (result) => {
                    passData(result);
                },
                (error) => {
                    console.log(error);
                }
            );
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return (
        <div className='googleContainer'>
            <button id='googleSignIn' onClick={login}>
                <img alt='' src={g} />
                <div className='googleText'>Continue with Google</div>
            </button>
        </div>
    )
}

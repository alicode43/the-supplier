 // src/app/auth/google-callback/page.js
 'use client';

 import { useEffect } from 'react';
 import { useRouter } from 'next/navigation';
 import Cookies from 'js-cookie';
 
 const GoogleCallback = () => {
   const router = useRouter();
 
   useEffect(() => {
     const checkExistingTokens = () => {
       const accessToken = Cookies.get('accessToken');
       const refreshToken = Cookies.get('refreshToken');
       if (accessToken && refreshToken) {
         router.push('/');
         return true;
       }
       return false;
     };
 
     if (checkExistingTokens()) return;
 
     const handleGoogleCallback = async () => {
       const query = new URLSearchParams(window.location.search);
       const code = query.get('code');
       
       if (code) {
         try {
           console.log('before call');
           const response = await fetch(`https://near-to-you-backend.onrender.com/api/v1/users/google/callback?code=${code}`, {
             method: 'GET',
           });
 
 
           const result = await response.json();
 
           Cookies.set('accessToken', result.data.accessToken, { expires: 7, path: '/' });
           Cookies.set('refreshToken', result.data.refreshToken, { expires: 7, path: '/' });
 
           router.push('/');
         } catch (error) {
           if (error instanceof Error) {
             console.error('Google callback error:', error.message);
           } else {
             console.error('Google callback error:', error);
           }
           router.push('/signin');
         }
       } else {
         router.push('/');
       }
     };
 
     handleGoogleCallback();
   }, [router]);
 
   return <div>Authenticating...</div>;
 };
 
 export default GoogleCallback;
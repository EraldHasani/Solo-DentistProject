import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

function LoginPage() {

  return (
   <>
    <div className="d-flex justify-content-betweem">
        <Login/>
        <Register/>
    </div>
   
   </>
   
  )
}

export default LoginPage

import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import loginphoto from '../images/Login.jpg'

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const user = localStorage.getItem('user');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Call the login function from the AuthContext
            await login(email, password);
            navigate('/dashboard')
            // Redirect or perform any other actions after successful login
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='login-container'>
            <img className='login-photo' src={loginphoto} alt="" />
            <form className='login-form' onSubmit={handleLogin}>
                
                    < div className='form-group'>
                        <h1>Login</h1>
                        <div  >
                            <label style={{textAlign:"left"}}>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='mt-2'>
                            <label  style={{textAlign:"left"}}>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit">Login</button>
                    <div>
                        <p>Don't have an account? <br /> <a href="/register">Register</a></p>

                    </div>
                        
                    </div>

                  
                
            </form>
        </div>
    );
};

export default Login;
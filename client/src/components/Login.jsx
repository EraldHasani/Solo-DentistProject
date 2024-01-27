import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <form onSubmit={handleLogin}>
                
                    < div>
                        <div>
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit">Login</button>
                    </div>

                  
                
            </form>
        </div>
    );
};

export default Login;
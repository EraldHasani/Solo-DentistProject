import { createContext, useContext, useState } from 'react';
import axios from 'axios'


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      },{
        withCredentials: true,
      });

      const { data } = response;

      // Assuming the server sends back a JWT token
      const { token:token, user: userData } = data;

      // Set the user state
      console.log(userData)
      setUser(userData);
     
      // Store the token in localStorage or a cookie
      localStorage.setItem('token', token);
      const userDataString = JSON.stringify(userData);
      localStorage.setItem('user', userDataString);

      localStorage.setItem('userId', userData._id);


      return userData; // You might want to return user data for further use
    } catch (error) {
      console.error('Login failed:', error.message);
      throw error;
    }
  };

  const register = async (firstNameDentist, lastNameDentist, emailDentist , passwordDentist, confirmPasswordDentist,roleDentist, nipt) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        firstName: firstNameDentist,
        lastName: lastNameDentist,
        email: emailDentist,
        password: passwordDentist,
        confirmPassword: confirmPasswordDentist,
        role: roleDentist,
        nipt: nipt,

      },{
        withCredentials: true,
      });

      const { data } = response;

      // Assuming the server sends back a JWT token
      const { token, user: userData } = data;
      
      // Set the user state
      setUser(userData);

      // Store the token in localStorage or a cookie
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userData._id);
      const userDataString = JSON.stringify(userData);
      localStorage.setItem('user', userDataString);

      return userData; // You might want to return user data for further use
    } catch (error) {
      console.error('Registration failed:', error.message);
      console.log(error)
      throw error;
    }
  };


  const registerClient = async (firstName, lastName, email, roleClient, password, confirmPassword) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        firstName,
        lastName,
        email,
       role: roleClient,
        password,
        confirmPassword,

      },{
        withCredentials: true,
      });

      const { data } = response;

      // Assuming the server sends back a JWT token
      const { token, user: userData } = data;
      
      // Set the user state
      setUser(userData);

      // Store the token in localStorage or a cookie
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userData._id);
      const userDataString = JSON.stringify(userData);
      localStorage.setItem('user', userDataString);

      return userData; // You might want to return user data for further use
    } catch (error) {
      console.error('Registration failed:', error.message);
      console.log(error)
      throw error;
    }
  };

  const logout = async () =>  {
    try {
      axios.post('http://localhost:8000/api/logout',{
        withCredentials: true
      });
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '/login';
       // Remove the token from localStorage or a cookie
    } catch (error) {
      console.error('Logout failed:', error.message);
      console.log(error)
      throw error;
    }
    
  
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register,registerClient }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
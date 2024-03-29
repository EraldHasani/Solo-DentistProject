import React,{ useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import WelcomePage from './components/WelcomePage'
import Login from './components/Login'
import Register from './components/Register'
import Form from './components/Form'
import Dashboard from './components/Dashboard'
import Albania from './components/Albania'
import OneClinic from './components/OneClinic'
import './App.css'
import AllClinics from './components/AllClinics';
import BookAppointment from './components/BookAppointment';
import UpdateForm from './components/UpdateForm';

function App() {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          {
            token ?(
              <>
                <Route path="create" element={<Form  user={user}/>} />
                <Route path="create" element={<Form  user={user}/>} />
                <Route path="albania" element={<Albania/>}/>

                <Route path ="/dashboard" element={<Dashboard/>}/>
                <Route path="/clinic/:id" element={<OneClinic />} />
                <Route path="/clinics" element={<AllClinics />} />
                <Route path="/booking/clinic/:id" element={<BookAppointment />} />
                <Route path="/update/clinic/:id" element={<UpdateForm />} />
      
              </>
            ) :
            (
            <>
                            <Route path ="/" element={<Dashboard/>}/>
                            <Route path="/register" element={<Register />} />
                            <Route path="albania" element={<Albania/>}/>
                             <Route path="/login" element={<Login />} />



           
              </>
            )
          }
         
        </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App

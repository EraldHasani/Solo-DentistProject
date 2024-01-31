import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import { useAuth } from '../AuthContext';
import Logo from "../images/Logoo.jpg";
const Navbar = (props) => {
    const { logout } = useAuth();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [roleClient, setRoleClient] = useState("client")
    const [roleDentist, setRoleDentist] = useState("dentist")
    const userId = localStorage.getItem('userId');


    const userDataString = localStorage.getItem('user'); // Retrieve the string from localStorage
    const user = JSON.parse(userDataString);

    console.log(user.firstName); // Example: Accessing the firstName property

    console.log(user)
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${userId}`, {
            withCredentials: true,
        })
            .then((res) => {
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])



    const handleLogout = async (e) => {
        try {
            await logout();
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }




    return (

        <nav className="navbar navbar-expand-lg">
<div className="container-fluid" style={{ width: '100%', height: '100%', alignItems: 'center', fontWeight: 'bold', marginTop: user.role === 'user' ? '20px' : user.role === 'dentist' ? '20px' : '0px' }}>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                    <ul className="navbar-nav">
                        
                        <li className=" w-25">
                            <img className="logo " src={Logo} alt="" />
                        </li>
              
                        
                        
                       
                        <div className="d-flex justify-content-unset mx-3">
                            <li className="nav-item mx-5 ">
                                <Link className="nav-link mx-2 " to="/dashboard">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-5" to="/albania">Albania</Link>
                            </li>
                        </div>

                        {
                            userId ? (
                                <div className="d-flex justify-content-between">
                                   <div>
                                   {user.role === 'client' && (
                                        <li className="nav-item mx-2">
                                            <Link className="nav-link mr-3" to="/clinics">View All Clinics</Link>
                                        </li>
                                    )}
                                    </div> 

                                    <div>
                                    {user.role === 'dentist' && (
                                        <div className="d-flex justify-content-between ">

                                        <li className="nav-item">
                                         <Link className="nav-link " to="/create">Add Clinic</Link>
                                     </li>
                                            <li className="nav-item ">
                                                <p className="nav-link ">Clinic: {firstName} {lastName}</p>
                                            </li>
                                     </div>
                                    )}
                                    {user.role === 'client' && (
                                        <div className="d-flex justify-content-between">
                                    <li className="nav-item  mx-4">
                                            <p className="nav-link">User: {firstName} {lastName}</p>
                                        </li>
                                        </div>

                                    )}


                                    </div>
                                    
                                    <li className="nav-item">
                                        <a className="nav-link mx-5" onClick={handleLogout}>Logout</a>
                                    </li>
                                   
                                </div>
                            ) : (
                                <div className="d-flex">
                                    <li className="nav-item">
                                        <Link className="nav-link mx-5" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link mx-5" to="/register">Register</Link>
                                    </li>
                                </div>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>


    )
}
export default Navbar;
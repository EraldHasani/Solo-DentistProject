import React from "react";  
import { Link, useParams } from "react-router-dom";
import { useAuth } from '../AuthContext';

const Navbar = (props) => {
    const { logout } = useAuth();
    const userId = localStorage.getItem('userId');

    
    const handleLogout = async (e) => {
        try {
            await logout();
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className="navbar">

        <nav className="navbar navbar-expand-lg  d-flex justify-content-between">
            
        <div className="container-fluid">
       
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/dashboard" ><p className="nav-link active" aria-current="page" >Home</p></Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogout}>Logout</a>
              </li>
             
              
              <li className="nav-item">
                <Link to="/create"><p className="nav-link" >Add Clinic</p></Link>
              </li>
         
            </ul>
          </div>
        </div>
      </nav>
      </div>
    )
}
export default Navbar;
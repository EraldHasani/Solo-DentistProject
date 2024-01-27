import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";


const WelcomePage = () => {
    

    return(
       <>
       <nav className="d-flex justify-content-end">
       </nav>
       
      <h4>Welcome to Albania </h4>
      <h5>We talk about Albania</h5>
      <p>In order to proceed, please</p>
      <Link to={'/register'}>Login or Register</Link>

    

       
            
      </>
    )
};

export default WelcomePage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../App.css";
import Navbar from "./Navbar";
import clinicLogo from "../images/Clinic.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import AlbaniaLogo from "../images/AlbaniaFlag.png";
import VideoLogo from "../images/VideoLogo.mp4";
import { SocialIcon } from 'react-social-icons'
import { CiStar } from "react-icons/ci";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'





const AllClinics = (props) => {
    const { id } = useParams();
    const [clinics, setClinics] = useState({});
    const [city, setCity] = useState("");

    const [reset, setReset] = useState(false);


    useEffect(() => {
        axios.get(`http://localhost:8000/api/clinics`, {
            withCredentials: true,
        })
            .then((res) => {
                console.log(res.data)
                setClinics(res.data.clinics)
                setReset(false);
            })
            .catch((err) => {
                console.log(err)
            })
    }
        , [reset])





    const filterClinics = (e) => {
        const selectedCity = e.target.value;
        setCity(selectedCity);

        axios.get(`http://localhost:8000/api/filtered-Clinics/${selectedCity}`, {
            withCredentials: true,
        })
            .then((res) => {
                console.log(res.data)
                setClinics(res.data.clinics)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleReset = () => {
        setCity("");
        setReset(true);
    };

    return (
        <>

            <div>
                <Navbar />
            </div>



            <div className="containe ">
                <h1>Here you can see all clinics</h1>
                <div className="content-clinic d-flex justify-content-evenly">
                    <div className="list-grid">
                    <div className="m-4">
                      
                    <span className="us-form">
                        <select className="unwrap" name="" id="" onChange={filterClinics} value={reset ? "" : city}>
                            <option   >Select one City</option>
                            <option value="Tirane">Tirane</option>
                            <option value="Durres">Durres</option>
                            <option value="Vlore">Vlore</option>
                            <option value="Peshkopi">Peshkopi</option>
                            <option value="Elbasan">Elbasan</option>
                            <option value="Shkoder">Shkoder</option>
                            <option value="Vore">Vore</option>
                            <option value="Fier">Fier</option>
                            <option value="Korce">Korce</option>
                            <option value="Berat">Berat</option>
                            <option value="Lushnje">Lushnje</option>
                            <option value="Kavaje">Kavaje</option>
                            <option value="Lac">Lac</option>
                            <option value="Gjirokaster">Gjirokaster</option>
                            <option value="Lezhe">Lezhe</option>
                            <option value="Kukes">Kukes</option>
                            <option value="Sarande">Sarande</option>
                            <option value="Pogradec">Pogradec</option>
                            <option value="Kruje">Kruje</option>
                            <option value="Permet">Permet</option>
                            <option value="Librazhd">Librazhd</option>
                            <option value="Tepelene">Tepelene</option>
                            <option value="Mamurras">Mamurras</option>
                            <option value="Bajram Curri">Bajram Curri</option>
                            <option value="Peqin">Peqin</option>
                            <option value="Ura Vajgurore">Ura Vajgurore</option>
                            <option value="Rrogozhine">Rrogozhine</option>
                            <option value="Kamez">Kamez</option>

                        </select>
                        </span>

  
  
                      <div>
                      <button className="ressetButton m-2" onClick={handleReset}> Resset </button>

                      </div>
                    </div>

                    <div className="cards m-2">

                        {clinics.length > 0 ? (
                            clinics.map((clinic, index) => (

                                <div className="cardsingle ">

                                    <div className="infossingle">
                                        <div className="imagesingle"></div>
                                        <div className="infosingle">
                                            <div>
                                                <p className="namesingle">
                                                    {clinic.title}
                                                </p>
                                                <p className="functionsingle">
                                                   {clinic.phone}
                                                </p>
                                            </div>  
                                            <div className="statssingle">
                                                <p className="flexsingle flex-col">
                                                    Reviews
                                                    <span className="state-valuesingle">
                                                        {clinic.review.length}
                                                    </span>
                                                </p>
                                                <p className="flexsingle">
                                                    Rating
                                                    <span className="state-valuesingle">
                                                        {clinic.averagerating}<FontAwesomeIcon icon={faStar} style={{color: "#FFD43B",}} />


                                                    </span>
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                    <Link to={`/clinic/${clinic._id}`}> <button className="requestsingle" type="button">
                                        View clinic
                                    </button> </Link>
                                </div>

                                // <div className="cardAllclinics col-md-6 " key={index}>

                                //     <div  className="">

                                //         <div className="row g-0 ">
                                //             <div className="col-md-4">
                                //                 <img src={clinicLogo} className="img-fluid rounded-start" alt="ero" />
                                //             </div>
                                //             <div className="col-md-8 ">

                                //                 <div className="cardAllclinics-body ">
                                //             <Link  to={`/clinic/${clinic._id}`}  style={{ textDecoration: 'none' }}> <h5 className="fs-2" >{clinic.title}</h5> </Link>

                                //                 <p>{clinic.description}</p>

                                //                 <p><FaPhoneAlt />  {clinic.phone}</p>
                                //                 <div className="cardfooter d-flex justify-content-evenly ">

                                //                 <p> <img src={AlbaniaLogo} alt="" width="30" height="30"/> {clinic.city},Albania</p>

                                //                 <Link to={`/clinic/${clinic._id}`}>
                                //                     <button className="btn">View more</button>
                                //                 </Link>
                                //                 </div>

                                //             </div>
                                //             </div>
                                //         </div>
                                //     </div>
                                // </div>

                            )
                            )

                        ) : (
                            <h1>No Clinics</h1>
                        )
                        }
                    </div>

                    </div>
                </div>



              
                <footer className="footer" >
                    <div className="footer footer-content   align-items-center d-flex justify-content-evenly">
                        <div>
                            <video autoPlay loop muted src={VideoLogo} width="200" height="200"></video>

                        </div>
                        <div className="footer-section about">
                            <h1 className="logo-text m-3">Albania Dental  Travel</h1>
                            <p>  We help to find the best Albanian Dental clinics for your needs. </p>
                        </div>

                        <div className="socials m-3">
                            <SocialIcon className="m-2" url="https://www.facebook.com/" />
                            <SocialIcon className="m-2" url="https://www.instagram.com/" />
                            <SocialIcon className="m-2" url="https://www.twitter.com/" />
                            <SocialIcon className="m-2" url="https://www.youtube.com/" />

                            <div className="contact m-3">
                                <span><i className="fas fa-phone"> Celular :</i> &nbsp; (+355)69123456</span>
                            </div>
                        </div>
                    </div>





                </footer>
            </div>
          





        

        </>
    )
}
export default AllClinics;

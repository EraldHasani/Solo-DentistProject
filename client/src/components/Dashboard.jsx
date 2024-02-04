import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import 'animate.css';
import { IoLocationOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../AuthContext';
import Navbar from "./Navbar";
import img1 from "../images/sfondImage.png";
import video1 from "../images/airplane.mp4";
import { SocialIcon } from 'react-social-icons'
import VideoLogo from "../images/VideoLogo.mp4";
import Albania from "../images/ALBANIA.mp4";
import Clinic from "../images/Clinic.jpg";
import AlbaniaLogo from "../images/AlbaniaFlag.png";
const Dashboard = (props) => {
    const userId = localStorage.getItem('userId');


   
    const { user } = useAuth();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [top3Clinics, setTop3Clinics] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8000/api/top3", {
            withCredentials: true,
        }).then((res) => {
            console.log(res.data)
            setTop3Clinics(res.data.clinics)
        })
            .catch((err) => {
                console.log(err)

            })
    }, [])




    return (
        <>
            <div >
                <header>
                    <Navbar />
                </header>

                <video className="mainVideo" src={Albania} autoPlay loop muted />
                <div className="videoOverlay">
                    <i> <p className="videoText">
                        Një buzëqeshje e shëndetshme <br /> <span>ndërsa shijoni pushimet tuaja </span> <br /><span>në Shqipëri!</span>
                    </p></i>
                </div>


                <h1 className="mainTitle animate__animated animate__zoomIn animate__delay-0,5s"> Why Albania is perfect destination for you </h1>
                <div>
                    <div className="d-flex justify-content-evenly">


                        <div className="containerdashboard">
                            <div className="box">
                                <span className="title">Nature</span>
                                <div>
                                    <strong>Albania has it all!</strong>
                                    <p> Sun, sea, rivers, fields, hills, mountains and unlimited fun</p>
                                </div>
                            </div>
                        </div>


                        <div className="containerdashboard">
                            <div className="box">
                                <span className="title">Short wait times</span>
                                <div>
                                    <strong>Albania's healthcare system</strong>
                                    <p>often offers shorter wait times for dental appointments and procedures compared to some other countries.</p>
                                </div>
                            </div>
                        </div>

                        <div className="containerdashboard">
                            <div className="box">
                                <span className="title">The prices</span>
                                <div>
                                    <strong>A procedure might cost you $10.000 back home</strong>
                                    <p>in whatever country you are from, it costs $1000 in Albania, flights, and accommodation included.</p>
                                </div>
                            </div>
                        </div>
                        


                    </div>
                    <Link to="/albania" > <button className="button-55" role="button">View more about Albania</button> </Link>

                  






                </div>

                <div >
                    <h1 className="bestDentists mt-5">Here you can find the best Clinics </h1>

                    <div id="carouselExampleCaptions" className="carousel slide">
                        <div className="carousel-indicators">
                            {top3Clinics.length > 0 &&
                                top3Clinics.map((clinic, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        data-bs-slide-to={index}
                                        className={index === 0 ? "active" : ""}
                                        aria-current={index === 0 ? "true" : ""}
                                        aria-label={`Slide ${index + 1}`}
                                    ></button>
                                ))}
                        </div>

                        <div className="carousel-inner">
                            {top3Clinics.length > 0 ? (
                                top3Clinics.map((clinic, index) => (


                                    <div className={`carousel-item h-50 ${index === 0 ? "active" : ""}`} key={index}>

                                        <div className="cardClinic d-flex justify-content-between ">
                                            <div className="cardClinicphoto">
                                                {/* <p>{clinic.image}</p> */}
                                                <img className="imgclinic" src={clinic.image} alt="" />
                                            </div>
                                            <div className="card-body">
                                                <Link className="text-white" to={`/clinic/${clinic._id}`} style={{ textDecoration: 'none' }}> <h5 className="fs-2" >{clinic.title}</h5> </Link>


                                                <p><FaPhoneAlt />  {clinic.phone}</p>
                                                <p><IoLocationOutline /> {clinic.address}</p>

                                                <div className="d-flex justify-content-between">
                                                    <p> {clinic.review.length} Reviews</p>
                                                    <p> Rating :{clinic.averagerating} <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", }} /></p>
                                                </div>
                                                <div className="cardfooter d-flex justify-content-evenly  ">


                                                    <p> <img className="m-2" src={AlbaniaLogo} alt="" width="30" height="30" /> {clinic.city},Albania</p>

                                                    
                                                    
                                                    {
                                                        userId ? (
                                                            <Link className="text-decoration-none m-2" to={`/clinic/${clinic._id}`}>
                                                            <button className="button-10" role="button">View more</button>
                                                            </Link>
                                                        ) : (
                                                            <Link className="text-decoration-none m-2" to={`/login`}>
                                                            <button className="button-10" role="button">View more</button>
                                                            </Link>
                                                        )
                                                    }
                                                   
                                                </div>




                                            </div>


                                        </div>
                                        <div>

                                        </div>

                                    </div>
                                ))
                            ) : (
                                <div className="carousel-item active h-50">
                                    <h1>There are no clinics</h1>
                                </div>
                            )}
                        </div>

                        <button className="carousel-control-prev h-50 " type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>

                        <button className="carousel-control-next h-50 " type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>



                    {userId ? (
  <Link to="/clinics"><button className="button-30" role="button">View all Clinics</button></Link>
) : (
  <Link to="/login"><button className="button-30" role="button">View all Clinics</button></Link>
)}                </div>







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



            </div >
        </>
    )

}

export default Dashboard;
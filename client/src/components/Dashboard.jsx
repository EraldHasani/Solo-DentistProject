import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import 'animate.css';
import { useAuth } from '../AuthContext';
import Navbar from "./Navbar";
import img1 from "../images/sfondImage.png";
import video1 from "../images/airplane.mp4";
import { SocialIcon } from 'react-social-icons'

const Dashboard = (props) => {

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
            <div className="container-fluid">
                <header>
                    <Navbar />
                    <img className="mainImage" src={img1} autoPlay loop muted></img>

                </header>


                <h1 className="mainTitle animate__animated animate__zoomIn animate__delay-0,5s"> Why Albania is perfect destination for you </h1>
                <div>
                    <div className="d-flex justify-content-evenly">
                        <div className="card">
                            <h1> Nature</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, animi perferendis.
                                Ipsa, eum. consectetur deserunt ex?</p>

                        </div>
                        <div className="card">
                            <h1>Price</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, animi perferendis.
                                Ipsa, eum. consectetur deserunt ex?</p>


                        </div>
                        <div className="card">
                            <h1>Best service</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In, animi perferendis.
                                Ipsa, eum. consectetur deserunt ex?</p>
                        </div>

                    </div>
                    <Link to="/albania" ><button className="btn">View more about Albania</button> </Link>
                </div>

                <div >
                    <h1 className="bestDentists">Here you can find the best Clinics </h1>



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
        {top3Clinics.length > 0 ?
            top3Clinics.map((clinic, index) => (
                <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                    <div className="">
                    <img src={img1} className="d-block w-100" alt="clinic image" />
                    </div>
                    <div className="carousel-caption d-none d-md-block">
                        <h5>{clinic.title}</h5>
                        <p>{clinic.description}</p>
                        <p>{clinic.address}</p>
                        <p>{clinic.city}</p>
                        <Link to={`/clinic/${clinic._id}`}> <button className="btn">View more</button>
                        </Link>
                    </div>
                </div>
            ))
            : (
                <div className="carousel-item active">
                    <h1>There are no clinics</h1>
                </div>
            )
        }
    </div>

    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
    </button>

    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
    </button>
</div>



<Link to="/clinics" className="btn btn-danger">View all Clinics</Link>
                </div>







                <footer >
                    <div className="footer-content bg-primary d-flex justify-content-evenly">
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
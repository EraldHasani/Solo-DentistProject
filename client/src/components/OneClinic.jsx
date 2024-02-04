import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../App.css";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Clinic from "../images/Clinic.jpg";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import VideoLogo from "../images/VideoLogo.mp4";
import { SocialIcon } from 'react-social-icons'
import visitAlbania from "../images/VisitAlbani1.jpeg";
import visitAlbania3 from "../images/VisitAlbania3.jpeg";
import visitAlbania4 from "../images/Albaniavisit5.jpeg";

// import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";


import AlbaniaLogo from "../images/Albaniaflag.png";
// import StarRatingPicker from './StarRatingPicker';  




const OneClinic = (props) => {
  const { id } = useParams();
  const [clinic, setClinic] = useState({});
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({})
  const [review, setReview] = useState([])
  const userId = localStorage.getItem('userId');
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")


  const userDataString = localStorage.getItem('user'); // Retrieve the string from localStorage
  const user = JSON.parse(userDataString);

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: "AIzaSyDNOnnW2lR3qZJqjZ8ZO2w4K0ajm-zmyGA",
// });






  useEffect(() => {
    axios.get(`http://localhost:8000/api/clinic/${id}`, {
      withCredentials: true,
    })
      .then((res) => {
        setClinic(res.data.clinic)
        setServices(res.data.clinic.sherbime)
        setStaff(res.data.clinic.staff)
        setReview(res.data.clinic.review)

      })
      .catch((err) => {
        console.log(err)

      })

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

  const addReview = (e) => {
    e.preventDefault();
    if (text.length < 5 || rating <= 0 || rating > 5) {
      setErrors("You must enter a valid review")
    }
    else {

      axios.patch(`http://localhost:8000/api/clinic/review/${id}`, {
        text,
        rating,
        firstName,
        lastName,
        userId: userId,

      }, {
        withCredentials: true,
      })
        .then((res) => {
          console.log(res.data)
          setText("");
          setRating(0);
          setFirstName("");
          setLastName("");
          setErrors({})
          setReview(res.data.clinic.review)




        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const chunkArray = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
      arr.slice(index * size, index * size + size)
    );
  };

  // Chunk reviews into groups of three
  const chunkedReviews = chunkArray(review, 4);
  const chunkedImages = chunkArray(review, 3);


//   const mapContainerStyle = {
//     width: "80%",
//     height: "200px",
// };

// if (loadError) return "Error loading maps";
// if (!isLoaded) return "Loading maps";



  return (

    <>
      <div className="" >

        <Navbar />

        <div className="d-flex justify-content-between m-5 border-bottom" >
          <h1>{clinic.title}</h1>
          {user.role === 'client' ? (
            <Link to={`/booking/clinic/${clinic._id}`}>
              <button className="btn btn-primary">Book Appointment</button>
            </Link>
          ) : null}

          {userId && user.role === 'dentist' && clinic.userId === userId ? (
            <Link to={`/update/clinic/${clinic._id}`}>
              <button className="btn btn-primary">Update</button>
            </Link>
          ) : null}
        </div>
        <h4 className="d-flex justify-content-between m-5 ">{clinic.city},Albania</h4>

        <div>
          <div className="cards m-2">

            <div className="cardClinic d-flex justify-content-between ">
              <div className="cardClinicphoto">

                {/* <p>{clinic.image}</p> */}
                <img className="imgclinic" src={clinic.image} alt="" />
              </div>

              <div className="card-body">
                <h5 className="text-danger"><FaCheck />   Best Price Guarantee</h5>

                <h5 className="card-title text-center">{clinic.title}</h5>
                <p><FaPhoneAlt />  {clinic.phone}</p>
                <p>{clinic.email}</p>
                <div className="d-flex justify-content-between">
                  <p> {review.length} Reviews</p>
                  <p> Rating :{clinic.averagerating} <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", }} /></p>
                </div>
                <div className="cardfooter d-flex justify-content-evenly ">

                  <p> <img src={AlbaniaLogo} alt="" width="30" height="30" /> {clinic.city},Albania</p>

                </div>

              </div>
            </div>

          </div>




            <div className="imagesClinic">
              <div>
                <h1 className="text-center mt-5 mb-4 border-bottom  "> {clinic.title} Photos</h1>
              <div className="d-flex justify-content-evenly align-items-center">
               <img className="m-5 border" src={clinic.clinicImages1}  width="4000" height={"400px"} alt="" />
               <img  className="m-5 border" src={clinic.clinicImages2} width="4000" height={"400px"}  alt="" />
             

                  </div>
              </div>

            </div>






{/* 
          <div className="imagesClinic">

            <div className="containerOneclinic-fluid p-2">
              <h1 className="text-center mt-5 mb-4 border-bottom "> {clinic.title} Photos</h1>
              <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {chunkedImages.map((chunk, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                      <div className="d-flex justify-content-center">
                        {chunk.map((review, idx) => (
                          <div className="card m-4" style={{ maxWidth: '400px' }} key={idx}>
                            <div className="card-body">
                            <img src={clinic.clinicImages} alt="" />

                              <img src={visitAlbania} alt="" width={"100%"} />
                              <p className="card-text text-dark" ></p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>

          </div> */}









          <div className="description ">
            <h1 className="border-bottom m-2"> All about {clinic.title}</h1>

            <div className="d-flex justify-content-between">
              <p className="m-4 fs-5">{clinic.description}</p>
              <img className="m-5" src={clinic.clinicImages} alt="" width="300" height="300" />
            </div>

          </div>


          <div className="services ">
            <h1 className="border-bottom">Discover All That the Clinic Offers: </h1>
            <div className=" service-body ">
              {
                services.map((service, index) => (
                  <div key={index} className="service-item">
                    <div className="m-4">
                      <h5 className="fs-4">{service.servicesTitle}</h5>
                      <p className=" fs-6" >• {service.servicesDescription}</p>

                    </div>

                  </div>
                ))
              }

            </div>
          </div>
        </div>



        <div className=" ">
          <h1 className="border-bottom m-5">Meet the Staff</h1>

          {
            staff.map((staff, index) => (
              <div key={index} className="cardstaff d-flex justify-content- ">
                <div className="staffClinicphoto ">
                  <img className="imgstaff" src={staff.imageStaff} alt="" />
                  {/* <p className=" fs-6" >• image: {staff.imageStaff}</p>   */}
                  <p className="">{staff.firstName} {staff.lastName}</p>
                  <p className=" fs-6" >{staff.experience} vite eksperienc</p>

                </div>


                <div className="card-bodystaff">
                  <p className=" fs-5 text-primary m-3" >• Ekspertise: <br /></p>
                  <span className="fs-6 m-3">{staff.expertise} </span>
                  <p className=" fs-5 text-primary m-3" >Shkolla: <br /></p>
                  <span className="fs-6 m-3">{staff.education} </span>

                </div>
              </div>
            ))
          }

        </div>



        <div className="tableprice p-1 ">

          <h2 className="border-bottom p-4">Know the Prices for Your Procedures </h2>
          <table  >

            <thead className="fs-4 ">
              <tr >
                <th > Titulli Sherbimit </th>
                <th>Pershkrimi sherbimit</th>
                <th>Tipi</th>
                <th>Cmimi</th>
                <th></th>
                <th>Koha</th>

              </tr>
            </thead>
            <tbody>
              {
                services.map((service, index) => (
                  <tr key={index}>
                    <td>{service.servicesTitle}</td>
                    <td>{service.servicesDescription}</td>
                    <td>{service.servicesType}</td>
                    <td>{service.servicesPrice} €</td>
                    <td></td>
                    <td>{service.servicesDuration} dite</td>
                  </tr>
                ))

              }

            </tbody>


          </table>


        </div>
        <div className=" p-5 text-align-center align-items-center">
          <h1 className="border-bottom m-5"> {clinic.title}  Payment Methods</h1>
          <div className="d-flex justify-content-evenly">
            {clinic.cash ? <p className="payment fs-1">Cash</p> : null}
            {clinic.card ? <p className="payment fs-1">Credit Card</p> : null}
            {clinic.bankTransfer ? <p className="payment fs-1">Bank Transfer</p> : null}
          </div>
        </div>



      <div className="reviewClinics">
       <div className="containerOneclinic-fluid p-2">
          <h1 className="text-center mt-5 mb-4 border-bottom ">Reviews for {clinic.title}</h1>
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {chunkedReviews.map((chunk, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                  <div className="d-flex justify-content-center">
                    {chunk.map((review, idx) => (
                      <div className="card cardreview m-5" style={{ maxWidth: '400px' }} key={idx}>
                        <div className="card-bodyreview">
                          <h5 className="card-title text-dark">Emri: {review.firstName} {review.lastName}</h5>
                          <p className="card-text text-dark" >{review.text}</p>
                          <p>{review.rating} <FontAwesomeIcon icon={faStar} style={{ color: "#FFD43B", }} /></p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev h-50" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next h-50 " type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon h-50" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
       </div>
       </div>


        {
          user.role === 'client' ? (

            <div className="container d-flex justify-content-center">
              <div className="add-review-container">
                <h2>Add Review for {clinic.title}</h2>
                {errors.length > 0 && <span className="error-message">{errors}</span>}
                <div>
                  <label htmlFor="reviewDescription">Review description:</label>
                  <textarea
                    id="reviewDescription"
                    className="form-control"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  {text.length > 0 && text.length < 5 && (
                    <p className="error-message">Text must be at least 5 characters</p>
                  )}
                </div>
                <div>
                  <label htmlFor="rating">Rating:</label>
                  <input
                    id="rating"
                    type="number"
                    name="review"
                    min="0"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={addReview}>
                  Add Review
                </button>
              </div>
            </div>) : (
            <div></div>
          )
        }



{/* <div className="single-map">
            <GoogleMap 
                mapContainerStyle={mapContainerStyle}
                zoom={20}
                center={{
                    lat: clinic.lat,
                    lng: clinic.long,
                }}
            >
                <MarkerF
                    position={{
                        lat: clinic.lat,
                        lng: clinic.long,
                    }}
                />
            </GoogleMap>
            </div> */}


        

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
export default OneClinic;

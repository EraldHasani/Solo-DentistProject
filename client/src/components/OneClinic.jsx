import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../App.css";
import Navbar from "./Navbar";

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
    const token = localStorage.getItem('token');
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [color, setColor] = useState('#FFD56A');  // Set an initial color






    useEffect(() => {
        axios.get(`http://localhost:8000/api/clinic/${id}`)
            .then((res) => {
                console.log(res.data)
                setClinic(res.data.clinic)
                setServices(res.data.clinic.sherbime)
                setStaff(res.data.clinic.staff)
                setReview(res.data.clinic.review || [])

            })
            .catch((err) => {
                console.log(err)
            })
    }
        , [])

    const addReview = (e) => {
        e.preventDefault();
        if (text.length < 5 || rating < 0 || rating > 5) {
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

                    setReview(res.data.review)
                    setText("")
                    setRating(0)
                    setFirstName("")
                    setLastName("")
                    setErrors({})


                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }






    return (

        <>
            <div>
                <Navbar />

                <div className="row">

                    <div className="col-md-6">
                        <h1>{clinic.title}</h1>
                        <p>{clinic.description}</p>
                        <p>{clinic.address}</p>
                        <p>{clinic.city}</p>
                        <p>{clinic.phone}</p>
                        <p>{clinic.email}</p>

                        <p>{clinic.payment}</p>
                        <p>{clinic.cash}</p>
                        <p>{clinic.creditCard}</p>
                        <p>{clinic.bankTransfer}</p>
                        <p>{clinic.image}</p>
                        <p>{clinic.clinicImages}</p>


                    </div>
                </div>
                <div className="container d-flex justify-content-evenly">

                    <div>
                        <div className="col-md-6">
                            <h2>Services</h2>
                            {
                                services.map((service, index) => (
                                    <div key={index}>
                                        <h3> Titulli sherbimit{service.servicesTitle}</h3>
                                        <p> Pershkrimi sherbimit: {service.servicesDescription}</p>
                                        <p> Cmimi:{service.servicesPrice}</p>
                                        <p> Kohzgjatja e sherbimit:{service.servicesDuration}</p>
                                        <p> Tipi: {service.servicesType}</p>
                                    </div>
                                ))

                            }
                        </div>
                    </div>

                    <div>
                        <div className="col-md-6">

                            <h2>Staff</h2>
                            {
                                staff.map((staff, index) => (
                                    <div key={index}>

                                        <h3>Emri: {staff.firstName}{staff.lastNAme}</h3>
                                        <p>Eksperienca: {staff.exprience}</p>
                                        <p>Ekspertise: {staff.expertise}</p>
                                        <p>Titulli: {staff.education}</p>
                                        <p>image: {staff.staffImage}</p>

                                    </div>
                                ))
                            }


                        </div>

                    </div>

                    <div>
                        <h2>Add Review for {clinic.title}</h2>
                        <div className="m-auto" onSubmit={(e) => addReview(e)}>

                            <label className="form-label" >Review description:</label>
                            <textarea className="form-controll" type="text" onChange={(e) => setText(e.target.value)} />
                        </div>
                        {
                            text.length > 0 && text.length < 5 ?

                                <p className="text-danger">Text must be at least 5 characters</p>
                                : null}
                        <div>
                            <label className="form-label" htmlFor="">Rating:</label>
                            <input type="number" min="0" max="5" onChange={(e) => setRating(e.target.value)} />

                        </div>
                        {
                            rating > 0 && rating > 5 ?

                                <p className="text-danger">Rating must be between 0 and 5</p> : null
                        }
                        <div>
                            <label className="form-label" htmlFor="">First Name:</label>
                            <input type="text" onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div>
                            <label className="form-label" htmlFor="">Last Name:</label>
                            <input type="text" onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        {
                            firstName.length > 0 && firstName.length < 2 ?
                                <p className="text-danger">First Name must be at least 2 characters</p> :
                                null
                        }

                        <button className="btn btn-primary" onClick={addReview}>Add Review</button>
                    </div>
                    <div>
                        <h2>Reviews</h2>
                        {review.length > 0 ? (
                            review.map((review, index) => (
                                <div key={index}>
                                    <p>Emri: {review.firstName} {review.lastName}</p>
                                    <p>{review.text}</p>
                                    <p>{review.rating}</p>
                                </div>
                            ))
                        ) : (
                            <h1>There are no reviews yet for {clinic.title}</h1>
                        )}
                    </div>


                </div>
            </div>

        </>
    )
}
export default OneClinic;

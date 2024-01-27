import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../App.css";
import Navbar from "./Navbar";

const AllClinics = (props) => {
    const { id } = useParams();
    const [clinics, setClinics] = useState({});
    const [city, setCity] = useState("");
    
    const [reset,setReset] = useState(false);


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



                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1>Filter Clinics</h1>
                            
                            <select name="" id="" onChange={filterClinics}  value={reset ? "" : city}>
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
                            <button onClick={handleReset}> Resset </button>
                        </div>



                        <div>

                            {clinics.length > 0 ? (
                                clinics.map((clinic, index) => (
                                    <div className="col-md-4" key={index}>
                                        <div className="">
                                            <div className="card-body">
                                                <h5 className="card-title">{clinic.title}</h5>
                                                <img src={clinic.image} className="card-img-top" alt="clinic image" />
                                                <p className="card-text">{clinic.description}</p>
                                                <p className="card-text">{clinic.address}</p>
                                                <p className="card-text">{clinic.city}</p>
                                                <p className="card-text">{clinic.phone}</p>
                                                <p className="card-text">{clinic.email}</p>
                                                <p className="card-text">{clinic.payment}</p>


                                                <Link to={`/clinic/${clinic._id}`} className="btn btn-primary">View More</Link>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h1>No Clinics</h1>
                            )
                            }
                        </div>


                    </div>


                </div>

            </>
        )
    }
    export default AllClinics;

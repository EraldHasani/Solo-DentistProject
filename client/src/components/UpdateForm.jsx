import React, { useEffect, useState } from "react";
import { useNavigate, Link, useFetcher, useParams } from "react-router-dom";
import axios from 'axios'
import { useAuth } from '../AuthContext';
import Navbar from "./Navbar";
import VideoLogo from "../images/VideoLogo.mp4";
import { SocialIcon } from 'react-social-icons'



const UpdateForm = () => {

    const { user } = useAuth();
    const { id } = useParams();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("city");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [desc, setDesc] = useState("");
    const [clinicImages, setClinicImages] = useState("");
    const [sherbime, setSherbime] = useState("");
    const [cash, setCash] = useState(false);
    const [creditCard, setCreditCard] = useState(false);
    const [bankTransfer, setBankTransfer] = useState(false);
    const [errors, setErrors] = useState({});

    const [services, setServices] = useState(null);
    const [servicesTitle, setServicesTitle] = useState("");
    const [servicesDescription, setServicesDescription] = useState("");
    const [servicesDuration, setServicesDuration] = useState(0);
    const [servicesType, setServicesType] = useState("");
    const [servicesPrice, setServicesPrice] = useState(0);

    const [staff, setStaff] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [experience, setExperience] = useState(0);
    const [expertise, setExpertise] = useState("");
    const [education, setEducation] = useState("");
    const [imageStaff, setImageStaff] = useState("");

    const userId = localStorage.getItem('userId');


    const navigateBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/clinic/${id}`, {
            withCredentials: true,
        })
            .then((res) => {
                console.log(res.data.clinic);
                setTitle(res.data.clinic.title);
                setAddress(res.data.clinic.address);
                setCity(res.data.clinic.city);
                setEmail(res.data.clinic.email);
                setPhone(res.data.clinic.phone);
                setDescription(res.data.clinic.description);
                setImage(res.data.clinic.image);
                setClinicImages(res.data.clinic.clinicImages);
                setCash(res.data.clinic.cash);
                setCreditCard(res.data.clinic.creditCard);
                setBankTransfer(res.data.clinic.bankTransfer);
                setServices(res.data.clinic.sherbime);
                setStaff(res.data.clinic.staff);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    const UpdateClinic = (e) => {
        e.preventDefault();


        const updatedClinic = {
            title: title,
                description: description,
                address: address,
                city: city,
                phone: phone,
                email: email,
                image: image,
                clinicImages: clinicImages,
                cash: cash,
                card: creditCard,
                bankTransfer: bankTransfer,
                sherbime: services,
                staff: staff,
                userId: userId,

        }
        console.log(updatedClinic);

        axios.patch(`http://localhost:8000/api/clinic/${id}`, updatedClinic, {
            withCredentials: true,
        })
            .then((res) => {
                console.log(res.data);
                if (title.length < 5 || address.length < 5 || city.length < 3 || phone.length < 10 || description.length < 10) {
                    setErrors("Form has some problems")

                } else {
                    setTitle("");
                    setAddress("");
                    setCity("");
                    setEmail("");
                    setPhone("");
                    setDescription("");
                    setImage("");
                    setClinicImages("");
                    setCash(false);
                    setCreditCard(false);
                    setBankTransfer(false);
                    setServices(null);
                    setStaff(null);
                    setErrors("");
                    navigateBack();

                }
            }
            )
            .catch((err) => {
                console.log(err)
            })
    }


    const updateService = (e) => {
        e.preventDefault();
        if (!updateService) {
            setServices([{
                servicesTitle,
                servicesDescription,
                servicesDuration,
                servicesType,
                servicesPrice,
                // clinicId: "",
            }])
        }
        else {
            setServices([...services, {
                servicesTitle,
                servicesDescription,
                servicesDuration,
                servicesType,
                servicesPrice,
                // clinicId: "",
            }])
        }
        console.log(setServices);
        axios.patch(`http://localhost:8000/api/clinic/${id}`, setServices, {
            withCredentials: true,
        })
            .then((res) => {
                console.log(res.data);
                if (servicesTitle.length < 3 || servicesDescription.length < 3 || servicesDuration.length < 1 || servicesType.length < 3 || servicesPrice.length < 1) {
                    setErrors("Form has some problems")
                } else {
                    setServicesTitle("");
                    setServicesDescription("");
                    setServicesDuration(0);
                    setServicesType("");
                    setServicesPrice(0);
                    setErrors("");
                }
            })
            .catch((err) => {
                console.log(err)
            })
    };




    const removeService = (index) => {
        const updatedServices = [...services];
        updatedServices.splice(index, 1);
        setServices(updatedServices);
    };


    const updateStaff = (e) => {
        e.preventDefault();
        if (!updateStaff) {
            setStaff([{
                firstName,
                lastName,
                experience,
                expertise,
                education,
                imageStaff,
                // clinicId: "",
            }])

        }
        else {

            setStaff([...staff, {
                firstName,
                lastName,
                experience,
                expertise,
                education,
                imageStaff,
                // clinicId: "",
            }])
        }
        console.log(setStaff);
        axios.patch(`http://localhost:8000/api/clinic/${id}`, setStaff, {
            withCredentials: true,
        })

            .then((res) => {
                console.log(res.data);
                if (firstName.length < 3 || lastName.length < 3 || experience.length < 1 || expertise.length < 3 || education.length < 3) {
                    setErrors("Form has some problems")
                } else {
                    setFirstName("");
                    setLastName("");
                    setExperience(0);
                    setExpertise("");
                    setEducation("");
                    setImageStaff("");
                    setErrors("");
                }
            })
            .catch((err) => {
                console.log(err)
            })
    };



    const removeStaff = (index) => {
        const updatedStaff = [...staff];
        updatedStaff.splice(index, 1);
        setStaff(updatedStaff);
    };








    return (

        <>
            <div> <Navbar /></div>


            <form onSubmit={UpdateClinic} className=" mt-4 mb-3">
                {
                    errors.length > 0 ?
                        <span className="text-danger m-3" >{errors} </span>
                        : null
                }

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={title} className="form-control" onChange={(e) => setTitle(e.target.value)} placeholder="Clinic nane" />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" value={address} className="form-control" onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                </div>

                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <select className="form-select" name="" id="" onChange={(e) => setCity(e.target.value)} value={city} >
                        <option disabled value="city">Select one City</option>
                        <option value="Tirane">Tirane</option>
                        <option value="Durres">Durres</option>
                        <option value="Vlore">Vlore</option>
                        <option value="Sarande">Sarande</option>
                        <option value="Pogradec">Pogradec</option>
                        <option value="Elbasan">Elbasan</option>
                        <option value="Shkoder">Shkoder</option>
                        <option value="Vore">Vore</option>
                        <option value="Fier">Fier</option>
                        <option value="Peshkopi">Peshkopi</option>
                        <option value="Korce">Korce</option>
                        <option value="Berat">Berat</option>
                        <option value="Lushnje">Lushnje</option>
                        <option value="Kavaje">Kavaje</option>
                        <option value="Lac">Lac</option>
                        <option value="Gjirokaster">Gjirokaster</option>
                        <option value="Lezhe">Lezhe</option>
                        <option value="Kukes">Kukes</option>

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


                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Please enter your Email" />
                </div>



                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="phone" name="phone" value={phone} className="form-control" onChange={(e) => setPhone(e.target.value)} placeholder="Please enter your phone number" />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" value={description} className="form-control" onChange={(e) => setDescription(e.target.value)} placeholder="Please add some information about your clinic" />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="file" multiple name="image" className="form-control" onChange={(e) => setImage(e.target.value)} placeholder="Please add one display image " />
                </div>

                <div>
                    <label htmlFor="clinicImages">Clinic Images</label>
                    <input type="file" name="clinicImages" className="form-control" onChange={(e) => setClinicImages(e.target.value)} placeholder="Please add some images of your clinic" />
                </div>


                <div>
                    <h1 className="m-2"> Update Payment</h1>

                    <div className="form-group d-flex justify-content-evenly">
                        <div>
                            <label>cash:</label>
                            <input type="checkbox" className="checkbox" value={cash} onChange={(e) => setCash(e.target.checked)} checked={cash} />
                        </div>
                        <div>
                            <label>creditCard:</label>
                            <input type="checkbox" className="checkbox" value={creditCard} onChange={(e) => setCreditCard(e.target.checked)} checked={creditCard} />
                        </div>
                        <div>
                            <label>bankTransfer:</label>
                            <input type="checkbox" className="checkbox" value={bankTransfer} onChange={(e) => setBankTransfer(e.target.checked)} checked={bankTransfer} />
                        </div>
                    </div>


                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#shtoSherbim">
                        Shto Sherbim </button>



                    <div className="modal fade" id="shtoSherbim" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel" >Shto sherbim te ri</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body m-2">
                                    <input type="text" value={servicesTitle} name="sherbime" className="form-control" placeholder="Titulli i sherbimit"
                                        onChange={(e) => setServicesTitle(e.target.value)} />
                                    <br />
                                    <input type="text" value={servicesDescription} name="sherbime" className="form-control" placeholder="Pershkrimi i sherbimit"
                                        onChange={(e) => setServicesDescription(e.target.value)} />
                                    <br />
                                    <input type="number" value={servicesDuration} min="0" name="sherbime" className="form-control" placeholder="Koha e sherbimit"
                                        onChange={(e) => setServicesDuration(e.target.value)} />
                                    <br />
                                    <input type="text" value={servicesType} name="sherbime" className="form-control" placeholder="Tipi i sherbimit"
                                        onChange={(e) => setServicesType(e.target.value)} />
                                    <br />
                                    <input type="number" value={servicesPrice} min="0" name="sherbime" className="form-control" placeholder="Cmimi i sherbimit"
                                        onChange={(e) => setServicesPrice(e.target.value)} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={updateService} data-bs-dismiss="modal" >Update sherbim</button>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="d-flex">


                        </div>

                        {services ?
                            <div className="row row-cols-1 row-cols-md-3 ">

                                {services.map((service, index) => (
                                    <div key={index} className="col">
                                        <div className="cardservice ">
                                            <div className="cardservice-body ">

                                                <p className="card-title mb-4 "> Titull:{service.servicesTitle} </p>
                                                <p className="card-text"> {service.servicesDescription} </p>
                                                <p className="card-text">koha:  {service.servicesDuration} dite </p>
                                                <p className="card-text"> tipi: {service.servicesType} </p>
                                                <p className="card-text">cmimi: {service.servicesPrice}€ </p>
                                                <button type="button" className="btn btn-danger m-2 " onClick={() => removeService(index)}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div> :
                            <p>No services</p>
                        }

                    </div>

                    <div>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#shtoStaff">
                            Shto Staff </button>
                        <div className="modal fade" id="shtoStaff" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel" >Shto staff te ri</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="">
                                            <label > Emri</label>
                                            <input type="text" value={firstName} name="staff" className="form-control" placeholder="Emri "
                                                onChange={(e) => setFirstName(e.target.value)} /></div>
                                        <div>
                                            {
                                                firstName.length > 0 && firstName.length < 3 ?
                                                    <p className="text-danger"> Emri duhet te jete me i gjate se 3 karaktere! </p> : null

                                            }
                                            <label >Mbiemri</label>
                                            <input type="text" value={lastName} name="staff" className="form-control" placeholder="Mbiemri "
                                                onChange={(e) => setLastName(e.target.value)} />
                                        </div>
                                        {
                                            lastName.length > 0 && lastName.length < 3 ?
                                                <p className="text-danger"> Mbiemri duhet te jete me i gjate se 3 karaktere! </p> : null

                                        }
                                        <div>
                                            <label >Eksperienca</label>

                                            <input type="number" value={experience} name="staff" min="0" className="form-control" placeholder="Vitet e eksperiences "
                                                onChange={(e) => setExperience(e.target.value)} /></div>
                                        <div>

                                            <label >Specializimi</label>

                                            <input type="text" value={expertise} name="staff" className="form-control" placeholder="Ekspertiza"
                                                onChange={(e) => setExpertise(e.target.value)} /></div>
                                        <div>
                                            {
                                                expertise.length > 0 && expertise.length < 5 ?
                                                    <p className="text-danger"> Ekspertiza duhet te jete me e gjate se 3 karaktere! </p> : null

                                            }
                                            <label >Edukimi</label>

                                            <input type="text" value={education} name="staff" className="form-control" placeholder="Edukimi"
                                                onChange={(e) => setEducation(e.target.value)} />  </div>
                                        <div>
                                            {
                                                education.length > 0 && education.length < 5 ?
                                                    <p className="text-danger"> Edukimi duhet te jete me i gjate se 3 karaktere! </p> : null

                                            }
                                            <label >Foto personit</label>

                                            <input type="file" value={imageStaff} name="staff" className="form-control" placeholder="Foto e staffit"
                                                onChange={(e) => setImageStaff(e.target.value)} /></div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={updateStaff} data-bs-dismiss="modal" >Krijo staff</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="d-flex">

                            </div>
                            {
                                staff ? (
                                    <div className="row row-cols-1 row-cols-md-3 ">
                                        {staff.map((staff, index) => (
                                            <div key={index} className="col">
                                                <div className="cardservice ">
                                                    <div className="cardservice-body ">
                                                        <h5 className="card-title mb-4">{staff.firstName} {staff.lastName}</h5>
                                                        <p className="card-text">Eksperienca: {staff.experience} years</p>
                                                        <p className="card-text">Ekspertiza: {staff.expertise}</p>
                                                        <p className="card-text">Edukimi: {staff.education}</p>
                                                        <p className="card-text">Foto: {staff.imageStaff}</p>
                                                        <button type="button" className="btn btn-danger m-2" onClick={() => removeStaff(index)}>Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>No staff</p>
                                )
                            }

                        </div>


                    </div>

                </div>
                <button type="submit" className="btn btn-primary">Update Clinic</button>





            </form>
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
        </>
    );
};

export default UpdateForm;

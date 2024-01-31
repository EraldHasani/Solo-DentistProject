import React, { useState } from "react";
import { useNavigate, Link, useFetcher } from "react-router-dom";
import axios from 'axios'
import { useAuth } from '../AuthContext';
import Navbar from "./Navbar";
import VideoLogo from "../images/VideoLogo.mp4";
import { SocialIcon } from 'react-social-icons'





const Form = (props) => {

    const { user } = useAuth();
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


    const [photo, setPhoto] = useState(null);


    const userId = localStorage.getItem('userId');


    const navigateBack = () => {
        navigate('/dashboard')
    }


    const CreateClinic = (e) => {
        e.preventDefault();

        if (title.length < 5 || address.length < 5 || city.length < 3 || phone.length < 10 || description.length < 10) {
            setErrors("Form has some problems")
        }

        else {

            const newclinic = {
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
            console.log(newclinic)

            axios.post("http://localhost:8000/api/clinic", newclinic, {
                withCredentials: true,
            })
                .then((res) => {
                    console.log(res.data)

                    navigateBack();

                })
                .catch((err) => {

                    console.log(err);
                    setErrors("Your api has some problems");
                })
        }
    }

    const addService = (e) => {
        e.preventDefault();
        if (!services) {
            setServices([{
                servicesTitle,
                servicesDescription,
                servicesDuration,
                servicesType,
                servicesPrice,
                // clinicId: "",
            }])


        } else {
            setServices([...services, {
                servicesTitle,
                servicesDescription,
                servicesDuration,
                servicesType,
                servicesPrice,
                // clinicId: "",
            }])

        }
        setServicesTitle("");
        setServicesDescription("");
        setServicesDuration(0);
        setServicesType("");
        setServicesPrice(0);


    };

    const removeService = (index) => {
        const updatedServices = [...services];
        updatedServices.splice(index, 1);
        setServices(updatedServices);
    };


    const addStaff = (e) => {
        e.preventDefault();
        if (!staff) {
            setStaff([{
                firstName,
                lastName,
                experience,
                expertise,
                education,
                imageStaff,
                // clinicId: "",
            }])
        } else {
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
        setFirstName("");
        setLastName("");
        setExperience(0);
        setExpertise("");
        setEducation("");
        setImageStaff("");
    };
    const removeStaff = (index) => {
        const updatedStaff = [...staff];
        updatedStaff.splice(index, 1);
        setStaff(updatedStaff);
    };


    const handleChangeDesc = (e) => {
        setDesc(e.target.value);
    };

    const handleClick = (e) => {
        console.log(desc, image, 19);

        const formData = new FormData();
        formData.append('image', image);
        formData.append('desc', desc);
        axios.post('http://localhost:8000/api/clinic', formData, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    };
    
    
  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setPhoto(selectedPhoto);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, including the uploaded photo
    // For example, you can use FormData to send the photo to the server
    const formData = new FormData();
    formData.append('photo', photo);
    // Perform further actions like sending formData to the server via API
  };





    function validateEmail(email) {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email);
    }

    return (

        <>
            <div> <Navbar /></div>


            <form onSubmit={CreateClinic} className=" mt-4 mb-3">
                {
                    errors.length > 0 ?
                        <span className="text-danger m-3" >{errors} </span>
                        : null
                }

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" className="form-control" onChange={(e) => setTitle(e.target.value)} placeholder="Clinic nane" />
                </div>
                {
                    title.length > 0 && title.length < 5 ?
                        <p className="text-danger"> Title sholud be more than 5 characters! </p> : null
                }
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" className="form-control" onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                </div>
                {
                    address.length > 0 && address.length < 5 ?
                        <p className="text-danger"> Address sholud be more than 5 characters! </p> : null
                }
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
                {
                    city.length ? null :
                        <p className="text-danger"> Please select one city! </p>
                }
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Please enter your Email" />
                </div>



                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="phone" name="phone" className="form-control" onChange={(e) => setPhone(e.target.value)} placeholder="Please enter your phone number" />
                </div>
                {
                    phone.length > 0 && phone.length < 10 ?
                        <p className="text-danger"> Phone sholud be correct! </p> : null
                }
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" className="form-control" onChange={(e) => setDescription(e.target.value)} placeholder="Please add some information about your clinic" />
                </div>
                {
                    description.length > 0 && description.length < 10 ?
                        <p className="text-danger"> Description about your clinic sholud be more than 10 characters! </p> : null
                }
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input type="file" multiple name="image" className="form-control" onChange={(e) => setImage(e.target.value)} placeholder="Please add one display image " />
                </div>
                {
                    image.length > 0 && image.length < 1 ?
                        <p className="text-danger"> Please upload an image! </p> : null
                }
                <div>
                    <label htmlFor="clinicImages">Clinic Images</label>
                    <input type="file" name="clinicImages" className="form-control" onChange={(e) => setClinicImages(e.target.value)} placeholder="Please add some images of your clinic" />
                </div>
      <div>

                     <h1 className="m-2"> Choose Payment</h1>
         
  

                <div className="form-group d-flex justify-content-evenly">
                    <div>
                        <label>cash:</label>
                        <input type="checkbox" className="checkbox" onChange={(e) => setCash(e.target.checked)} checked={cash} />
                    </div>
                    <div>
                        <label>creditCard:</label>
                        <input type="checkbox" className="checkbox" onChange={(e) => setCreditCard(e.target.checked)} checked={creditCard} />
                    </div>
                    <div>
                        <label>bankTransfer:</label>
                        <input type="checkbox" className="checkbox" onChange={(e) => setBankTransfer(e.target.checked)} checked={bankTransfer} />
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="photo">Upload Photo:</label>
        <input type="file" id="photo" name="photo" onChange={handlePhotoChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
 

                <button type="button" className="btn btn-primary m-3" data-bs-toggle="modal" data-bs-target="#shtoSherbim">
                    Shto Sherbim </button>

                <div>
                    <div className="modal fade" id="shtoSherbim" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel" >Shto sherbim te ri</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body m-2">
                                    <div>
                                        <label htmlFor="">Titulli i sherbimit</label>
                                        <input type="text" value={servicesTitle} name="sherbime" className="form-control" placeholder="Titulli i sherbimit"
                                            onChange={(e) => setServicesTitle(e.target.value)} />
                                        <br />
                                    </div>

                                    {servicesTitle.length > 0 && servicesTitle.length < 5 ?
                                        <p className="text-danger"> Titulli i sherbimit sholud be more than 5 characters! </p> : null
                                    }

                                    <div>
                                        <label htmlFor="">Pershkrimi i sherbimit    </label>
                                        <input type="text" value={servicesDescription} name="sherbime" className="form-control" placeholder="Pershkrimi i sherbimit"
                                            onChange={(e) => setServicesDescription(e.target.value)} />
                                        <br />

                                    </div>
                                    {servicesDescription.length > 0 && servicesDescription.length < 10 ?
                                        <p className="text-danger"> Pershkrimi i sherbimit sholud be more than 10 characters! </p> : null
                                    }

                                    <div>
                                        <label htmlFor="">Koha per sherbimin (ne dite)</label>
                                        <input type="number" value={servicesDuration} min="0" name="sherbime" className="form-control" placeholder="Koha e sherbimit"
                                            onChange={(e) => setServicesDuration(e.target.value)} />
                                        <br />
                                    </div>
                                    {
                                        servicesDuration <= 0 ?
                                            <p className="text-danger"> Koha e sherbimit eshte e detyrueshme </p> : null
                                    }
                                    <div>
                                        <label htmlFor="">Tipi i sherbimit</label>
                                        <input type="text" value={servicesType} name="sherbime" className="form-control" placeholder="Tipi i sherbimit"
                                            onChange={(e) => setServicesType(e.target.value)} />
                                        <br />
                                    </div>
                                    {
                                        servicesType.length > 0 && servicesType.length < 5 ?
                                            <p className="text-danger"> Tipi i sherbimit duhet te jete me i gjate se 5 karaktere! </p> : null

                                    }
                                    <div>
                                        <label htmlFor="">Cimi i sherbimit (€)</label>
                                        <input type="number" value={servicesPrice} min="0" name="sherbime" className="form-control" placeholder="Cmimi i sherbimit "
                                            onChange={(e) => setServicesPrice(e.target.value)} />
                                    </div>
                                    {
                                        servicesPrice == 0 ?
                                            <p className="text-danger"> Cmimi i sherbimit duhet te jete i sakt! </p> : null
                                    }
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary" onClick={addService} data-bs-dismiss="modal" >Krijo sherbim</button>
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

                                    <div className="modal-body">
                                        <div>
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

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={addStaff} data-bs-dismiss="modal" >Krijo staff</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="d-flex">

                            </div>

                            <div>
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

                </div>

            </div>
            <button type="submit" className="btn btn-primary">Create Clinic</button>
      




        </form >
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

    )
}
export default Form;
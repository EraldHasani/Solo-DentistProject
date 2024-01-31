import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Box } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import loginphoto from '../images/login.jpg'


const Register = () => {

    const { register,registerClient } = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState();
    const [errorPassword, setErrorPassword] = useState();
    const [errorConfirmPassword, setErrorConfirmPassword] = useState();
    const [errorFirstName, setErrorFirstName] = useState();
    const [errorLastName, setErrorLastName] = useState();
    const [errorNipt, setErrorNipt] = useState();

    const[firstNameDentist, setFirstNameDentist] = useState('')
    const[lastNameDentist, setLastNameDentist] = useState('')
    const[emailDentist, setEmailDentist] = useState('')
    const[passwordDentist, setPasswordDentist] = useState('')
    const[confirmPasswordDentist, setConfirmPasswordDentist] = useState('')
    
    const [value, setValue] = useState('1');
    const [roleClient, setRoleClient] = useState('client');
    const [roleDentist, setRoleDentist] = useState('dentist');
    const [nipt, setNipt] = useState('');
    const [isValidNipt, setIsValidNipt] = useState(true);




    const navigate = useNavigate()

    const changeForm = (event, newValue) => {
        setValue(newValue);
    };


    const handleRegisterClient = async (e) => {
        e.preventDefault();

        try {
            // Call the register function from the AuthContext
            await registerClient(firstName, lastName, email,roleClient, password,confirmPassword, );
            navigate('/dashboard')
            // Redirect or perform any other actions after successful registration
        } catch (error) {
            setErrorEmail(error.response.data.errors.email.message)
              setErrorPassword(error.response.data.errors.password.message)
                setErrorConfirmPassword(error.response.data.errors.confirmPassword.message)
                    setErrorFirstName(error.response.data.errors.firstName.message)
                        setErrorLastName(error.response.data.errors.lastName.message)
        }
    };
    const handleRegisterDentist = async (e) => {
        e.preventDefault();

        try {
            // Call the register function from the AuthContext
            await register(firstNameDentist, lastNameDentist, emailDentist, passwordDentist, confirmPasswordDentist, roleDentist, nipt);
            navigate('/dashboard')
            // Redirect or perform any other actions after successful registration
        } catch (error) {
            console.log(error)
           setErrorEmail(error.response.data.errors.email.message)
              setErrorPassword(error.response.data.errors.password.message)
                setErrorConfirmPassword(error.response.data.errors.confirmPassword.message)
                    setErrorFirstName(error.response.data.errors.firstName.message)
                        setErrorLastName(error.response.data.errors.lastName.message)
                        setErrorNipt(error.response.data.errors.nipt.message)
        }
    };

    return (
        <div className='register-container '>
                        <img className='register-photo' src={loginphoto} alt="" />

            
            <TabContext value={value}>
                <Box className="d-flex justify-content-center " sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList className="  register-container m-5" onChange={changeForm} aria-label="lab API tabs example">
                        <Tab className='fs-3 d-flex flex-column justify-content-center align-items-center m-2' label="Client" value="1" />
                        <Tab  className='fs-3 d-flex flex-column justify-content-center align-items-center m-2'   label="dentist" value="2" />
                        
                    </TabList>
                </Box>
                <TabPanel className="register-container" value="1">
                    <form className='register-form' onSubmit={handleRegisterClient}>
                    <h1 className=''>Register</h1>

                        <div>
                            
                            <label style={{textAlign:"left"}}>First Name:</label>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        {
                            errorFirstName ?
                                <p className='text-center text-danger'>{errorFirstName}</p>
                                : null
                        }
                        <div>
                            <label style={{textAlign:"left"}}>Last Name:</label>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        {
                            errorLastName ?
                                <p className='text-center text-danger'>{errorLastName}</p>
                                : null
                        }

                        <div>
                            <label style={{textAlign:"left"}}>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        {
                            errorEmail ?
                                <p className='text-center text-danger'>{errorEmail}</p>
                                : null
                        }


                        <div>
                            <label style={{textAlign:"left"}}>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {
                            errorPassword ?
                                <p className='text-center text-danger'>{errorPassword}</p>
                                : null
                        }

                        <div>
                            <label style={{textAlign:"left"}}>Confirm Password:</label>
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        {
                            errorConfirmPassword ?
                                <p className='text-center text-danger'>{errorConfirmPassword}</p>
                                : null
                        }

                        <button className="btn btn-success m-3 " type='submit'>Register</button>
                        <div>
                            <p>Already have an account? <br /> <a href="/login">Login</a></p>
                        </div>
                    </form>

                </TabPanel>
                <TabPanel className="register-container"   value="2">
                    <form className='register-form2' onSubmit={handleRegisterDentist}>
                        <h1>Register</h1>
                        <div>
                            <label style={{textAlign:"left"}}>First Name:</label>
                            <input type="text" value={firstNameDentist} onChange={(e) => setFirstNameDentist(e.target.value)} />
                        </div>
                        {
                            errorFirstName ?
                                <p className='text-center text-danger'>{errorFirstName}</p>
                                : null
                        }
                        <div style={{textAlign:"left"}}>
                            <label>Last Name:</label>
                            <input type="text" value={lastNameDentist} onChange={(e) => setLastNameDentist(e.target.value)} />
                        </div>
                        {
                            errorLastName ?
                                <p className='text-center text-danger'>{errorLastName}</p>
                                : null
                        }

                        <div style={{textAlign:"left"}}>
                            <label>Email:</label>
                            <input type="email" value={emailDentist} onChange={(e) => setEmailDentist(e.target.value)} />
                        </div>
                        {
                            errorEmail ?
                                <p className='text-center text-danger'>{errorEmail}</p>
                                : null
                        }


                        <div style={{textAlign:"left"}}>
                            <label>Password:</label>
                            <input type="password" value={passwordDentist} onChange={(e) => setPasswordDentist(e.target.value)} />
                        </div>
                        {
                            errorPassword ?
                                <p className='text-center text-danger'>{errorPassword}</p>
                                : null
                        }

                        <div style={{textAlign:"left"}}>
                            <label>NIPT:</label>
                            <input type="text" value={nipt} onChange={(e) => setNipt(e.target.value)} />
                        </div>
                                 {
                            errorNipt ?
                                <p className='text-center text-danger'>{errorNipt}</p>
                                : null
                                 }
                        <div style={{textAlign:"left"}}>
                            <label>Confirm Password:</label>
                            <input type="password" value={confirmPasswordDentist} onChange={(e) => setConfirmPasswordDentist(e.target.value)} />
                        </div>
                        {
                            errorConfirmPassword ?
                                <p className='text-center text-danger'>{errorConfirmPassword}</p>
                                : null
                        }

                        <button className="btn btn-success  m-2" type='submit'>Register</button>
                        <div>
                            <p>Already have an account? <br /> <a href="/login">Login</a></p>
                        </div>
                    </form>
                </TabPanel>

            </TabContext>


        </div>
    );
};

export default Register;
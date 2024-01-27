import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab, Box } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Register = () => {

    const { register } = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState();
    const [value, setValue] = useState('1');
    const [roleClient, setRoleClient] = useState('client');
    const [roleDentist, setRoleDentist] = useState('dentist');
    const [nipt, setNipt] = useState('');


    const navigate = useNavigate()

    const changeForm = (event, newValue) => {
        setValue(newValue);
    };


    const handleRegisterClient = async (e) => {
        e.preventDefault();

        try {
            // Call the register function from the AuthContext
            await register(firstName, lastName, email, password, confirmPassword, roleClient);
            navigate('/dashboard')
            // Redirect or perform any other actions after successful registration
        } catch (error) {
            setError('Some errors')
        }
    };
    const handleRegisterDentist = async (e) => {
        e.preventDefault();

        try {
            // Call the register function from the AuthContext
            await register(firstName, lastName, email, password, confirmPassword, roleDentist, nipt);
            navigate('/dashboard')
            // Redirect or perform any other actions after successful registration
        } catch (error) {
            setError('Some errors')
        }
    };

    return (
        <div>
            
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={changeForm} aria-label="lab API tabs example">
                        <Tab icon={<PhoneIcon />} label="Client" value="1" />
                        <Tab icon={<FavoriteIcon />} label="dentist" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <form className='form' onSubmit={handleRegisterClient}>
                        {
                            error ?
                                <p>{error}</p>
                                : null
                        }
                        <div>
                            <label>First Name:</label>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <label>Password:</label>
                            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>


                        <div>
                            <label>Confirm Password:</label>
                            <input type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>

                        <button type="submit">Register</button>
                    </form>

                </TabPanel>
                <TabPanel value="2">
                    <form className='form' onSubmit={handleRegisterDentist}>
                        {
                            error ?
                                <p>{error}</p>
                                : null
                        }
                        <div>
                            <label>First Name:</label>
                            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <label>Password:</label>
                            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <label>NIPT:</label>
                            <input type="text" value={nipt} onChange={(e) => setNipt(e.target.value)} />
                        </div>

                        <div>
                            <label>Confirm Password:</label>
                            <input type="text" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>

                        <button type="submit">Register</button>
                    </form>
                </TabPanel>

            </TabContext>


        </div>
    );
};

export default Register;
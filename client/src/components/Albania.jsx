import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import img1 from "../images/Mainphoto.webp";
import VideoLogo from "../images/VideoLogo.mp4";
import { SocialIcon } from 'react-social-icons'
import visitAlbania from "../images/VisitAlbani1.jpeg";
import visitAlbania3 from "../images/VisitAlbania3.jpeg";
import visitAlbania4 from "../images/Albaniavisit5.jpeg";
import berat from "../images/Berat.jpg";
import Durres from "../images/Durres.jpeg";
import Durres1 from "../images/durres1.jpeg";
import tirana from "../images/tirana.jpeg";
import ksamil from "../images/ksamil.jpeg";
import saranda from "../images/saranda.jpeg";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';



const Albania = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <>

            <div className="">

                <header>
                    <Navbar />
                </header>



                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={visitAlbania3} className="mainphoto d-block w-100 h-100" alt="..." />
                            <p className="photoText">Best Places to Visit in Albania</p>

                        </div>
                        <div className="carousel-item">
                            <img src={visitAlbania4} className="mainphoto d-block w-100 h-100" alt="..." />
                            <p className="photoText">Best Places to Visit in Albania</p>

                        </div>
                        <div className="carousel-item">
                            <img src={Durres} className="mainphoto d-block w-100 h-100" alt="..." />
                            <p className="photoText">Best Places to Visit in Albania</p>

                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>



                <div>
                    <h1 className="fs-1 m-4" >Albania</h1>
                    <p className=" w-75 " style={{textAlign:"left" , marginLeft:"200px"}}>Located in Southeastern Europe, on the Balkan Peninsula,
                        Albania is a must-visit, thanks to its rich history and breathtaking landscapes.
                        There are countless unique places to visit in Albania,
                        starting from the picturesque beaches to the mighty mountains full of lush vegetation.
                        <br /> The country’s amazing cultural heritage is perfectly represented by its many historical sites and monuments,
                        such as the national parks and the many castles. <br /> As soon as you visit Albania,
                        you’ll see that the warm hospitality and the interesting blend of Ottoman, Italian,
                        and other influences make this a truly captivating destination.</p>
                    <div className="p-3" style={{backgroundColor:"#eefcfe"}} >
                        <h1 className="fs-2 m-5" >How to Get to Albania?</h1>
                        <p>Albania is reachable from many countries, and depending on your starting location, you can get there by plane, car, or bus:</p>
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: 'divider', }}>
                                    <TabList onChange={handleChange} sx={{ backgroundColor: "#f5f5f5" }} aria-label="lab API tabs example">
                                        <Tab label="#1. By Plane" value="1" />
                                        <Tab label="#2. By Car" value="2" />
                                        <Tab label="#3. By Bus" value="3" />
                                    </TabList>
                                </Box>
                                <TabPanel sx={{ width: '70%', margin: '0 auto', textAlign: 'center', backgroundColor: "#f5f5f5" }} value="1">The easiest way to get to Albania is by plane. There are currently two airports in Albania,
                                    which are the Kukes International Airport and Tirana National Airport “Nene Tereza.”
                                    The airport that’s located in the capital of Tirana is more frequented by tourists, though.
                                    There are direct flights available from numerous countries, such as Turkey, Germany, England, and Italy.
                                    If you’re planning to come to Albania from the U.S., you can do so by plane as well.
                                    However, you’d have to catch a layover flight, meaning you’ll go to one country first, change planes, and then get to Albania.
                                    This is because there are no direct flights from the U.S. to Albania.</TabPanel>

                                <TabPanel sx={{ width: '70%', margin: '0 auto', textAlign: 'center', backgroundColor: "#f5f5f5" }} value="2">If you’re up for a road trip, you can choose to go by car. This way, you can make stops when you want or explore places along the way.
                                    The main roads are in good condition, and there are plenty of road signs, so you won’t get lost.
                                    Traveling by car also allows you to enjoy the stunning landscapes of Albania,
                                    such as the mountains and the coast of the Riviera.</TabPanel>


                                <TabPanel sx={{ width: '70%', margin: '0 auto', textAlign: 'center', backgroundColor: "#f5f5f5" }} value="3">Lastly, you can catch a bus to Albania.
                                    There are many bus lines available from various countries, including Turkey, Bulgaria, Germany, and Greece, to name a few.
                                    Just make sure to book your seat in advance, as the bus might be full, thus finding a seat impossible.
                                    The bus ticket prices vary from one place to the other.
                                    For example, a bus ticket from Bulgaria costs around €45, whereas a bus ticket from Germany costs around €100.</TabPanel>
                            </TabContext>
                        </Box>
                    </div>

                </div>


                <div>
                    <h1 className="fs-2 m-5">Best Places to Visit in Albania</h1>

                    <h1 className="fs-3 m-5">Tirana</h1>
                    <div className="d-flex justify-content-evenly " style={{backgroundColor:"#eefcfe"}}>
                        <p className="pAlbania w-50 mx-5"> Tirana, the capital of Albania, is known for its colorful Ottoman-, Fascist- and Soviet-era architecture.
                              Pastel buildings surround the city's focal point, Skanderbeg Square, which is named for its equestrian statue of a national hero.
                              On the square's north end is the modernist National History Museum,
                               covering prehistoric times through Communist rule and the anti-Communist uprisings of the 1990s. </p>
                        <img src={tirana} className="mainphoto d-block w-50 h-50 m-4" alt="..." />
                    </div>


                 
                        <h1 className="fs-3 m-5">Berat</h1>
                        <div className="d-flex justify-content-evenly " style={{backgroundColor:"#eefcfe"}}>
                           
                            <p className="pAlbania w-50 mx-5">Berat is one of the most beautiful cities in Albania,it’s also a UNESCO World Heritage Site.
                                The city is known for its white houses,which is why it’s often called the  “City of a Thousand Windows.”
                               <br /> Berat is also home to the Berat Castle, which is one of the largest castles in the Balkans.
                                The castle is located on a hill, and it offers a breathtaking view of the city.
                                There are also many museums in Berat, such as the National Ethnographic Museum and the Onufri Museum.</p>
                            <img src={berat} className="mainphoto d-block w-50 h-50 m-4" alt="..." />
                        </div>
                        <h1 className="fs-3 m-5">Durres</h1>
                        <div className="d-flex justify-content-evenly " style={{backgroundColor:"#eefcfe"}}>
                           
                            <p className="pAlbania w-50 mx-5">Durres is one of the most popular places to visit in Albania.
                                It’s a port city that’s located on the Adriatic Sea, and it’s also the second-largest city in Albania.
                                Durres is home to many historical sites, such as the Durres Castle and the Durres Amphitheater.
                                The city also has many museums, such as the Archaeological Museum and the Royal Villa of Durres.</p>
                            <img src={Durres1} className="mainphoto d-block w-50 h-50 m-4" alt="..." />

                        </div>

                        <h1 className="fs-3 m-5">Ksamil</h1>
                        <div className="d-flex justify-content-evenly " style={{backgroundColor:"#eefcfe"}}>
                           
                            <p className="pAlbania w-50 mx-5">Ksamil is a village that’s located in the southern part of Albania.
                                It’s a popular tourist destination, thanks to its beautiful beaches and crystal-clear water.
                                The village is also home to the Butrint National Park, which is a UNESCO World Heritage Site.
                                The park is home to many historical sites, such as the Butrint Amphitheater and the Lion Gate.</p>
                            <img src={ksamil} className="mainphoto d-block w-50 h-50 m-4" alt="..." />
                            </div>

                            <h1 className="fs-3 m-5">Saranda</h1>
                            <div className="d-flex justify-content-evenly " style={{backgroundColor:"#eefcfe"}}>
                            <p className="pAlbania w-50 mx-5">Saranda (Sarandë in Albanian) is a coastal town and popular holiday destination on the Albanian Riviera,
                             known for its unspoiled character and clear blue waters. 
                            It is located in the most southern part of Albania, between the hills and the Ionian Sea.</p>
                            <img src={saranda} className="mainphoto d-block w-50 h-50 m-4" alt="..." />
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


        </>
    )
};

export default Albania;
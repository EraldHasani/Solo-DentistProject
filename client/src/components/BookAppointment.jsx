import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import DatePicker from "react-datepicker";
import VideoLogo from "../images/VideoLogo.mp4";
import { SocialIcon } from 'react-social-icons'



const BookAppointment = ({ user, clinicId }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    // Fetch available dates for the clinic from the server
    const fetchAvailableDates = async () => {
      try {
        const response = await axios.get(`/api/clinics/${clinicId}/available-dates`);
        setAvailableDates(response.data.availableDates);
      } catch (error) {
        console.error('Error fetching available dates:', error);
      }
    };

    fetchAvailableDates();
  }, [clinicId]);

  useEffect(() => {
    // Fetch available slots for the selected date from the server
    const fetchAvailableSlots = async () => {
      try {
        if (selectedDate) {
          const response = await axios.get(`/api/clinics/${clinicId}/available-slots?date=${selectedDate}`);
          setAvailableSlots(response.data.availableSlots);
        }
      } catch (error) {
        console.error('Error fetching available slots:', error);
      }
    };

    fetchAvailableSlots();
  }, [clinicId, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(''); // Reset selected slot when the date changes
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  const handleBooking = async () => {
    try {
      // Send a request to the server to book the selected slot on the selected date
      await axios.post('/api/bookings', {
        clinicId,
        userId: user._id,
        selectedDate,
        selectedSlot,
      });
      // Handle success, maybe show a confirmation message
    } catch (error) {
      console.error('Error booking appointment:', error);
      // Handle error, show an error message
    }
  };

  return (
    <div>
      <h2>Select Appointment Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
      />
      {selectedDate && (
        <div>
          <h2>Select Time Slot</h2>
          <FormControl>
            <InputLabel id="slot-select-label">Time Slot</InputLabel>
            <Select
              labelId="slot-select-label"
              id="slot-select"
              value={selectedSlot}
              onChange={handleSlotChange}
            >
              {availableSlots.map((slot) => (
                <MenuItem key={slot} value={slot}>
                  {slot}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
      <h2>Available Slots</h2>
      <ul>
        {availableSlots.map((slot) => (
          <li key={slot}> {slot}</li>
        ))}
      </ul>
      <Button variant="contained" onClick={handleBooking} disabled={!selectedDate || !selectedSlot}>
        Book Appointment
      </Button>


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
    
  );
};


export default BookAppointment;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, DatePicker, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const BookAppointment = ({ user, clinicId }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    // Fetch available dates for the clinic from the server
    const fetchAvailableDates = async () => {
      try {
        const response = await axios.get(⁠/api/clinics / ${ clinicId } / available - dates ⁠);
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
          const response = await axios.get(⁠ /api/clinics / ${ clinicId } / available - slots ? date = ${ selectedDate } ⁠);
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
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <input {...params.inputProps} />}
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
          <li key={slot}>{slot}</li>
        ))}
      </ul>
      <Button variant="contained" onClick={handleBooking} disabled={!selectedDate || !selectedSlot}>
        Book Appointment
      </Button>
    </div>
  );
};

export default BookAppointment;
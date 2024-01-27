const Clinic = require('../models/clinic.model'); // Import your Clinic model
const Booking = require('../models/booking.model'); // Import your Booking model


// Controller to create a booking
exports.createBooking = async (req, res) => {
  try {
    const { clinicId, userId} = req.params;
    const {  selectedDate, selectedSlot } = req.body;

    // Fetch the clinic by ID from the database
    const clinic = await Clinic.findById(clinicId);

    if (!clinic) {
      return res.status(404).json({ error: 'Clinic not found' });
    }

    // Check if the selected slot exist for that date in the bookings that clinic has if exist return error message
    const  bookings = await Booking.find({ clinicId, date: selectedDate });
    const isSlotAvailable = !bookings.find((booking) => booking.slot === selectedSlot);


    

    if (!isSlotAvailable) {
        return res.status(400).json({ error: 'Slot not available' });
        }

    // Create a new booking record
    const newBooking = new Booking({
      clinicId,
      userId,
      date: selectedDate,
      slot: selectedSlot,
    });

    // Save the booking to the database
    await newBooking.save();

    // Remove the booked slot from the clinic's available slots

    return res.status(201).json({ message: 'Booking created successfully' });
  } catch (error) {
    console.error('Error creating booking:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get all bookings for a clinic (for the clinic owner)
exports.getAllBookings = async (req, res) => {
  try {
    const { clinicId } = req.params;

    // Fetch the clinic by ID from the database
    const clinic = await Clinic.findById(clinicId);

    if (!clinic) {
      return res.status(404).json({ error: 'Clinic not found' });
    }

    // Fetch all bookings for the clinic from the database
    const bookings = await Booking.find({ clinicId });

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getTakenSlots= async (req, res) => {
  try {
    const { clinicId } = req.params;
    //get selected date from the date selected in the calendar 
    const { date } = req.body.date; 
        


    // Fetch the clinic by ID from the database
    const clinic = await Clinic.findById(clinicId);

    if (!clinic) {
      return res.status(404).json({ error: 'Clinic not found' });
    }

    // Extract available slots for the specified date (adjust based on your model structure)
    const bookings = await Booking.find({ clinicId, date: date });
    const takenSlots = bookings.map((booking) => booking.slot);

    return res.status(200).json({ takenSlots });
  } catch (error) {
    console.error('Error fetching taken slots:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get all bookings for a user (for the user)


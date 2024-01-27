const BookingController = require('../controllers/booking.controller');
const {authenticate} = require('../config/jwt.config');
const clinicModel = require('../models/clinic.model');

module.exports = (app) => {
app.get("/api/booking/:clinicId",authenticate, BookingController.getTakenSlots);
app.post("/api/booking/:clinicId/:userId",authenticate, BookingController.createBooking);
app.get("/api/bookings/:clinicId",authenticate, BookingController.getAllBookings);

}


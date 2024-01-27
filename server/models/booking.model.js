const mongoose = require('mongoose');
const Booking = new mongoose.Schema({
    
   // Define Booking schema
    clinicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clinic',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    slot: {
      type: String,
      required: true,
    },
  },{ timestamps: true });
module.exports = mongoose.model('Booking', Booking);
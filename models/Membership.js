const mongoose = require('mongoose')

const membershipSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  durationInMonths: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Membership', membershipSchema)

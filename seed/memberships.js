require('dotenv').config()
const mongoose = require('mongoose')
const Membership = require('../models/Membership')

const memberships = [
  { type: 'AriBasic', price: 34.99, durationInMonths: 1 },
  { type: 'AriEstandar', price: 65.5, durationInMonths: 3 },
  { type: 'AriPremium', price: 89.75, durationInMonths: 6 }
]

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('🟢🟢 Conectado a MongoDB para semilla')

    await Membership.deleteMany({})
    console.log('🧼 Colección limpia')

    await Membership.insertMany(memberships)
    console.log('🆒 Membresías insertadas')

    process.exit()
  })
  .catch((err) => {
    console.error('🛑🛑 Error conectando:', err)
    process.exit(1)
  })

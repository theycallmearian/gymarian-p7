require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/User')
const Workout = require('../models/Workout')

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('​🟢 ​🟢 Conectado a MongoDB')

    await Workout.deleteMany({})
    console.log('🧼 Colección de workouts limpiada')

    const users = await User.find()
    if (users.length === 0) {
      throw new Error('🛑 No hay usuarios. Ejecuta primero seed/users.js')
    }

    const workouts = []

    for (const user of users) {
      workouts.push(
        {
          title: 'Pecho y tríceps',
          description: 'Press banca, aperturas, fondos',
          user: user._id
        },
        {
          title: 'Espalda y bíceps',
          description: 'Dominadas, remo, curl de bíceps',
          user: user._id
        }
      )
    }

    const inserted = await Workout.insertMany(workouts)
    console.log(`💪🏋️‍♀️ ${inserted.length} workouts insertados`)

    process.exit()
  } catch (err) {
    console.error('🛑 🛑 Error:', err)
    process.exit(1)
  }
}

run()

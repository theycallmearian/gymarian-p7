require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const Membership = require('../models/Membership')

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('​🟢​🟢 Conectado a MongoDB')

    await User.deleteMany({})
    console.log('​🧼 Colección de usuarios limpia')

    const memberships = await Membership.find()
    if (memberships.length === 0) {
      throw new Error(
        '🛑 No hay suscripciones disponibles. Ejecuta primero seed/memberships.js'
      )
    }

    const hashedPassword = await bcrypt.hash('12345678', 10)

    const users = [
      {
        name: 'Arian Admin',
        email: 'admin@gymarian.com',
        password: hashedPassword,
        role: 'admin',
        membership: memberships[0]._id
      },
      {
        name: 'Usuario Uno',
        email: 'user1@gymarian.com',
        password: hashedPassword,
        role: 'user',
        membership: memberships[1]._id
      },
      {
        name: 'Usuario Dos',
        email: 'user2@gymarian.com',
        password: hashedPassword,
        role: 'user',
        membership: memberships[2]._id
      }
    ]

    const insertedUsers = await User.insertMany(users)
    console.log(
      '👥 🆒 Usuarios insertados:\n',
      insertedUsers.map((u) => `${u.email} - ${u.role}`).join('\n')
    )

    process.exit()
  } catch (err) {
    console.error('🛑 🛑 Error:', err)
    process.exit(1)
  }
}

run()

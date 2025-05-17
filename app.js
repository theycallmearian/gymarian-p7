const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('🟢🟢🟢 GymArian API funcionando 🟢🟢🟢')
})

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const membershipRoutes = require('./routes/membershipRoutes')
const workoutRoutes = require('./routes/workoutRoutes')

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/memberships', membershipRoutes)
app.use('/api/workouts', workoutRoutes)

module.exports = app

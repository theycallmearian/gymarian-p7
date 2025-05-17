const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ msg: 'Usuario existente' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    })

    await newUser.save()
    res.status(201).json({ msg: 'Usuario registrado correctamente' })
  } catch (err) {
    console.error('Error en el registro:', err)
    res.status(500).json({ msg: 'Error en el servidor', err })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user)
      return res.status(400).json({ msg: `El usuario ${user} no existe` })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ msg: 'La contraseña no es correcta' })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
    console.error('Error en login:', err)
    res.status(500).json({ msg: 'Error en el servidor', err })
  }
}

module.exports = { register, login }

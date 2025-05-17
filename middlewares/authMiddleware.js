const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({ msg: 'Token no proporcionado' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    console.error('Token inválido:', err)
    return res.status(401).json({ msg: 'Token inválido o caducado' })
  }
}

module.exports = { verifyToken }

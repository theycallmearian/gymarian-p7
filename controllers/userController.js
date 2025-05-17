const User = require('../models/User')

const getAllUsers = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ msg: 'Acceso restringido, solo para administradores' })
  }

  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener los usuarios', err })
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params

  if (req.user.role !== 'admin' && req.user.id !== id) {
    return res.status(403).json({ msg: 'Acceso denegado' })
  }

  try {
    const user = await User.findById(id).select('-password')
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' })

    res.json(user)
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener el usuario', err })
  }
}

const updateUser = async (req, res) => {
  const { id } = req.params

  if (req.user.role !== 'admin' && req.user.id !== id) {
    return res.status(403).json({ msg: 'Acceso denegado' })
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true
    })
    res.json(updatedUser)
  } catch (err) {
    res.status(500).json({ msg: 'Error al actualizar el usuario', err })
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    await User.findByIdAndDelete(id)
    res.json({ msg: 'Usuario eliminado correctamente' })
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar el usuario', err })
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}

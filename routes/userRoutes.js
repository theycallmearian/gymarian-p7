const express = require('express')
const router = express.Router()

const { verifyToken } = require('../middlewares/authMiddleware')
const isAdmin = require('../middlewares/isAdmin')
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController')

router.use(verifyToken)

router.get('/', isAdmin, getAllUsers)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', isAdmin, deleteUser)

module.exports = router

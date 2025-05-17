const express = require('express')
const router = express.Router()
const {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
} = require('../controllers/workoutController')

const { verifyToken } = require('../middlewares/authMiddleware')

router.use(verifyToken)

router.get('/', getWorkouts)
router.get('/:id', getWorkoutById)
router.post('/', createWorkout)
router.put('/:id', updateWorkout)
router.delete('/:id', deleteWorkout)

module.exports = router

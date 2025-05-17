const Workout = require('../models/Workout')

const getWorkouts = async (req, res) => {
  try {
    const workouts =
      req.user.role === 'admin'
        ? await Workout.find().populate('user', 'name email')
        : await Workout.find({ user: req.user.id })

    res.json(workouts)
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener los entrenamientos', err })
  }
}

const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate(
      'user',
      'name email'
    )
    if (!workout)
      return res.status(404).json({ msg: 'Entrenamiento no encontrado' })

    if (
      req.user.role !== 'admin' &&
      workout.user._id.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: 'Acceso denegado' })
    }

    res.json(workout)
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener el entrenamiento', err })
  }
}

const createWorkout = async (req, res) => {
  try {
    const newWorkout = new Workout({
      ...req.body,
      user: req.user.id
    })

    const saved = await newWorkout.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ msg: 'Error al crear el entrenamiento', err })
  }
}

const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id)
    if (!workout)
      return res.status(404).json({ msg: 'Entrenamiento no encontrado' })

    if (req.user.role !== 'admin' && workout.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Acceso denegado' })
    }

    const updated = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ msg: 'Error al actualizar el entrenamiento', err })
  }
}

const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id)
    if (!workout)
      return res.status(404).json({
        msg: 'No se ha encontrado el entrenamiento que se quiere eliminar'
      })

    if (req.user.role !== 'admin' && workout.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Acceso denegado' })
    }

    await Workout.findByIdAndDelete(req.params.id)
    res.json({ msg: 'Entrenamiento eliminado correctamente' })
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar el entrenamiento', err })
  }
}

module.exports = {
  getWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
}

const Membership = require('../models/Membership')

const getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find()
    res.json(memberships)
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener las suscripciones: ', err })
  }
}

const createMembership = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ msg: 'Acceso restringido, solo para administradores' })
  }

  try {
    const newPlan = new Membership(req.body)
    const saved = await newPlan.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(500).json({ msg: 'Error al crear suscripción', err })
  }
}

const updateMembership = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ msg: 'Acceso restringido, solo para administradores' })
  }

  try {
    const updated = await Membership.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(updated)
  } catch (err) {
    res.status(500).json({ msg: 'Error al actualizar la suscripción', err })
  }
}

const deleteMembership = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ msg: 'Acceso restringido, solo para administradores' })
  }

  try {
    await Membership.findByIdAndDelete(req.params.id)
    res.json({ msg: 'Suscripción eliminada correctamente' })
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar suscripción', err })
  }
}

module.exports = {
  getMemberships,
  createMembership,
  updateMembership,
  deleteMembership
}

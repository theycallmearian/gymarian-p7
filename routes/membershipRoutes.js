const express = require('express')
const router = express.Router()

const {
  getMemberships,
  createMembership,
  updateMembership,
  deleteMembership
} = require('../controllers/membershipController')

const { verifyToken } = require('../middlewares/authMiddleware')

router.use(verifyToken)

router.get('/', getMemberships)
router.post('/', createMembership)
router.put('/:id', updateMembership)
router.delete('/:id', deleteMembership)

module.exports = router

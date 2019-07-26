const express = require('express')
const router = express.Router()
const dogController = require('../controllers/dogControllers')

router.get('/', dogController.find)
router.get('/new', dogController.create)
router.get('/:id', dogController.newPerrito)

module.exports = router;
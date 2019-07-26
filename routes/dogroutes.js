const express = require('express')
const router = express.Router()
const dogController = require('../controllers/dogControllers')

router.get('/', dogController.find)
router.get('/new', dogController.newPerrito)
router.post('/', dogController.newDog)

module.exports = router;
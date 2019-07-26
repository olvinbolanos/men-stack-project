const express = require('express')
const router = express.Router()
const dogController = require('../controllers/dogControllers')

router.get('/', dogController)


module.exports = router;
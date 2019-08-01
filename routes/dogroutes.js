const express = require('express')
const router = express.Router()
const dogController = require('../controllers/dogControllers')

router.get('/', dogController.find)
router.get('/new', dogController.makePerrito)
router.get('/about', dogController.shit)
router.post('/', dogController.newDog)
router.get('/:id', dogController.showOne)
router.get('/:id/edit', dogController.editOne)
router.put('/:id', dogController.update)
router.delete('/:id', dogController.deleteDog)

module.exports = router;    
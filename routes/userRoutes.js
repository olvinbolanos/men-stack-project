const express = require('express');
const router = express.Router();
const userController = require('../controllers/userCtrl');

router.get('/', userController.index);
router.get('/:id/edit', userController.edit);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
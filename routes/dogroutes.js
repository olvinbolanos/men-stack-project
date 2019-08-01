const express = require('express')
const router = express.Router()
const dogController = require('../controllers/dogControllers')
const User = require("../models/User")

const preventEdit = async(req,res,next)=>{
    console.log("checking iusers")
    const user = await User.findOne({'pets': req.params.id})
    console.log(user._id === req.session.userId, user._id, req.session)
    if(user._id.toString() === req.session.userId.toString()){
        next()
    } else {
        res.redirect(`/dog/${req.params.id}`)
    }
}

router.get('/', dogController.find)
router.get('/new', dogController.makePerrito)
router.get('/about', dogController.about)
router.post('/', dogController.newDog)
router.get('/:id', dogController.showOne)
router.get('/:id/edit', preventEdit, dogController.editOne)
router.put('/:id', dogController.update)
router.delete('/:id', dogController.deleteDog)

module.exports = router;    
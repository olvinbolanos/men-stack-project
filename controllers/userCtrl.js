const mongoose = require('mongoose');
const User = require('../models/user');
const Pet = require('../models/dog');

const userController = {
    index: async (req, res) => {
        try{
            const foundUsers = await User.find({})
            res.render('users/index.ejs', {
                user: foundUsers
            })
        }catch (err){
            res.send(err)
        }
    },
    edit: async (req, res) => {
        try{
            const foundUsers = await User.findById(req.params.id);
            res.render('users/edit.ejs', {
                user: foundUser
            })
        }catch(err){
            res.send(err)
        }
    },
    update: async (req, res) => {
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
            res.redirect(`users/${req.params.id}`)
        }catch(err){
            res.send(err)
        }
    }

}

module.exports = userController;
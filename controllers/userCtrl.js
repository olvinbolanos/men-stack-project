const mongoose = require('mongoose');
const User = require('../models/User');
const Pet = require('../models/dog');

const userController = {
    index: async (req, res) => {
        try{
            const foundUsers = await User.find({})
            res.redirect('/dog')
            
        } catch (err){
            res.send(err)
        }
    },
    details: async (req, res) => {
        try{
            const foundUser = await User.findById(req.params.id).populate('pets');
            res.render('users/show.ejs', {
                user: foundUser,
                isLogged: req.session.logged,
                userId: req.session.userId,
            })
        }catch(err){
            res.send(err)
        }
    },
    edit: async (req, res) => {

        try{
            const foundUser = await User.findById(req.params.id).populate('pets');
            res.render('users/edit.ejs', {
                user: foundUser,
                isLogged: req.session.logged,
                userId: req.session.userId,
            })
        }catch(err){
            res.send(err)
        }
    },
    update: async (req, res) => {
        try{
            if(!req.body.password){
                delete req.body.password
            };
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
            res.redirect(`/users/${updatedUser._id}`)
        }catch(err){
            res.send(err)
        }
    },
    delete: async (req, res) => {
        try{
            const deletedUser = await User.findOneAndRemove(req.params.id);
            const deletedPet = await Pet.remove({_id: {$in: deletedUser.pets}});
            res.redirect('/auth/logout');
        }catch(err){
            res.send(err)
        }
    }

}

module.exports = userController;
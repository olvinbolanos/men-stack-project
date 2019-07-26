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
    }
}

module.exports = userController;
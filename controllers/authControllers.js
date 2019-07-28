const mongoose = require('mongoose');
const User = require('../models/user');
const Dog = require('../models/dog')
const bcrypt = require('bcryptjs');

const authController = {
  loginPage: async (req, res) => {
    try {
        res.render('auth/login.ejs');
    } catch(err) {
      res.send(err);
    }
  },
  newRegistrationPage: async (req, res) => {
    try {
      res.render('auth/new.ejs');
    } catch(err) {
      res.send(err);
    }
  },
  submitLoginInfo: async (req, res) => {
    try {
      const foundUser = await User.findOne({username: req.body.username});
      if(foundUser){
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
          req.session.username = foundUser.username;
          req.session.logged = true;
          req.session.message = 'Welcome Back!';
          res.redirect('/dog');
        } else {
          req.sessions.message = 'Incorrect Username or Password'
          res.redirect('/');
        }
      } else {
        req.session.message = 'Incorrect Username or Password'
        res.redirect('/');
      }
    } catch(err) {
      res.send(err);
    }
  },
  submitNewAccountInfo: async (req, res) => {
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    req.body.password = hashedPassword;
    try {
      const createdUser = await User.create(req.body);
      req.session.userId = createdUser._id;
      req.session.username = createdUser.username;
      req.session.logged = true;
      res.redirect('/dog');
      console.log(createdUser); // REMOVE BEFORE PRESENTATION
    } catch(err) {
      res.send(err);
    }
  }
}

module.exports = authController;
const mongoose = require('mongoose');
const User = require('../models/User');
const Dog = require('../models/dog')
const bcrypt = require('bcryptjs');

const authController = {
  loginPage: async (req, res) => {
    try {
        res.render('auth/login.ejs', {
          isLogged: req.session.logged,
          message: req.session.message
        });
    } catch(err) {
      res.send(err);
    }
  },
  newRegistrationPage: async (req, res) => {
    try {
      res.render('auth/new.ejs', {
        isLogged: req.session.logged
      });
    } catch(err) {
      res.send(err);
    }
  },
  submitLoginInfo: async (req, res) => {
    try {
      const foundUser = await User.findOne({email: req.body.email});
      if(foundUser){
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
          req.session.username = foundUser.username;
          req.session.logged = true;
          req.session.userId = foundUser._id;
          req.session.message = `Welcome Back ${foundUser.username}!`;
          res.redirect('/dog')
        } else {
          req.session.message = `Incorrect Username or Password`
          res.redirect('/auth/login');
        }
      } else {
        req.session.message = 'Incorrect Username or Password'
        res.redirect('/auth/login');
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
      req.session.message = `Hello ${req.session.username}!`;
      console.log(req.session.username)
      res.redirect('/dog')
    } catch(err) {
      res.send(err);
    }
  },
 logoutSession: async (req, res) => {
   try {
    req.session.destroy();
    res.redirect('/');
   } catch(err) {
     res.send(err);
   }
 }
}

module.exports = authController;
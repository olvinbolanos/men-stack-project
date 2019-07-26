const mongoose = require('mongoose');
const User = require('../models/user');

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
  }











}

module.exports = authController;
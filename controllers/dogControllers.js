const express = require('express')
const router = express.Router()
const Dog = require('../models/dog')

const dogController = {
    find: async (req, res) => {
        try {
            const Doggy = await Dog.find({})
    
            res.render('dog/index.ejs', {
                dogs : Doggy
            })
    
        } catch (err) {
            res.send(err)
        }
    },
    newPerrito: async (req, res, next) => {
      try {
        res.send('Hello')
      } catch (err) {
        next(err)
      }
    },
    create: async (req, res) => {
        console.log(req.body)
        try {
          const newDog = await Dog.create(req.body)

          res.redirect('/dog')


        } catch (err) {
            res.send(err)
        }
    }
} 

module.exports = dogController;
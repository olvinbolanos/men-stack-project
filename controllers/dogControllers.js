const express = require('express')
const router = express.Router()
const Dog = require('../models/dog')

const dogController = {
    find: async (req, res) => {
        try {
            const Doggy = await Dog.find({})
    
            res.render('dog.ejs', {
                dogs : Doggy
            })
    
        } catch (err) {
            res.send(err)
        }
    },
    create: async (req, res) => {
        console.log(req.body)
        try {
          const newDog = Dog.create(req.body)

          res.redirect('/dogs')


        } catch (err) {
            res.send(err)
        }
    },
    newPerrito: async (req, res) => {
      try {
        res.render('new.ejs')
      } catch (err) {
        res.send(err)
      }
    }
} 

module.exports = dogController;
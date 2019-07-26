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
    }

} 

module.exports = dogController;
const mongoose = require('mongoose')

const dogSchema = new mongoose.Schema({
    name : {type: String, required: true},
    description: String,
    isHouseBroken : {type: Boolean, optional: true},
    sex : String,
    age : Number,
    breed : [String],
    location : String
})

const Dog = mongoose.model('Dogs', dogSchema)

module.exports = Dog
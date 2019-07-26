const mongoose = require('mongoose')

const dogSchema = new mongoose.Schema({
    name : {type: String, required: true},
    description: String,
    isGood : {type : Boolean, required :true},
    isPottyTrained : {type: Boolean, optional: true},
    sex : String,
    age : Number,
    breed : [String]
})

const Dog = mongoose.model('Dogs', dogSchema)

module.exports = Dog
const Dog = require('../models/dog')
const User = require('../models/user');


const dogController = {
    find: async (req, res) => {
        try {
            const Doggy = await Dog.find({})
            const People = await User.find({})
            res.render('dog/index.ejs', {
                dogs : Doggy,
                users : People
            })
           
    
        } catch (err) {
            res.send(err)
        }
    },
    makePerrito: async (req, res, next) => {
        try {
            const messages = ''
            res.render('dog/new.ejs', {
                message : messages
            })
        } catch(err) {
          res.send(err);
        }
      },
    newDog: async (req, res) => {
        if ( req.body.isHouseBroken === 'on') {
            req.body.isHouseBroken = true
        } else {
            req.body.isHouseBroken = false
        }
        console.log(req.body)
        try {
          const newDog = await Dog.create(req.body)
          const user = await User.findOne({'username': req.body.username})
          const messages = 'Could not find that username'
          if (!user) {
            res.render('dog/new.ejs', {
                message : messages
            })
          } else {
              user.pets.push(newDog)
              user.save((err, savedPet) => {
                  console.log(savedPet)
                  res.redirect('/dog')
              })
            }
        } catch (err) {
            res.send(err)
        }
    },
    showOne: async (req, res) => {
        try {
            const foundOne = await User.findOne({ 'pets': req.params.id})
            .populate('pets')
            .exec((err, foundAPet) => {
                let pet = {}

                for (let i = 0; i < foundAPet.pets.length; i++) {
                    if (foundAPet.pets[i]._id.toString() === req.params.id.toString()) {
                      pet = foundAPet.pets[i];
                      console.log(pet, ' the found pet')
                    }
                }

                console.log('===============')
                console.log(foundAPet, ' <--- in dogs show page')
                console.log('============')
                res.render('dog/show.ejs', {
                    user : foundAPet,
                    dog : pet
                })
            })
            
        } catch (err) {
            res.send(err)
        }
    },
    editOne: async (req, res) => {
        try {
            
            const foundDog = await Dog.findById(req.params.id)

            console.log(foundDog, '<-- in edit button')
            res.render('dog/edit.ejs', {
                dog : foundDog
            })
        } catch (err) {
            throw(err)
        }
    },
    update: async (req, res) => {
        console.log(req.body, '<-- update one')
        try {
            if(req.body.isHouseBroken === 'on'){
                req.body.isHouseBroken = true;
              } else {
                req.body.isHouseBroken = false;
              }
              
            const updateOne = await Dog.findByIdAndUpdate(req.params.id, req.body)
    
            res.redirect('/dog')
        } catch (err) {
            res.send(err)
        }
    }
} 



module.exports = dogController;

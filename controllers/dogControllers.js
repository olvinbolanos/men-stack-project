const Dog = require('../models/dog')
const User = require('../models/user');


const dogController = {
    find: async (req, res) => {
        try {
            const Doggy = await Dog.find({});
            const People = await User.find({});
            res.render('dog/index.ejs', {
                    dogs : Doggy,
                    users : People,
                    user: req.session.username,
                    message: req.session.message,
                    isLogged: req.session.logged
                });
        } catch (err) {
            res.send(err);
        }
    },
    makePerrito: async (req, res, next) => {
        try{
            const Doggy = await Dog.find({});
            const People = await User.find({});
            if(!req.session.logged) {
                req.session.message = 'Please Login To Post.'
                res.redirect('/dog')
            } else {
                res.render('dog/new.ejs', {
                    dogs : Doggy,
                    users : People,
                    user: req.session.username,
                    message: req.session.message,
                    isLogged: req.session.logged
                });
            }
        } catch (err) {
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
            const user = await User.findOne({'username': req.body.username})
            const messages = 'Could not find that username'
            if (!user) {
                res.render('dog/new.ejs', {
                    message : messages,
                    isLogged: req.session.logged
                })
            } else {
              const newDog = await Dog.create(req.body)
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
    showOne: (req, res) => {
        try {
            User.findOne({ 'pets': req.params.id})
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
                    dog : pet,
                    isLogged: req.session.logged
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
                dog : foundDog,
                isLogged: req.session.logged
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
    
            res.redirect('/dog', {
                isLogged: req.session.logged
            })
        } catch (err) {
            res.send(err)
        }
    },
    deleteDog: async (req, res) => {
        try{
            await Dog.findByIdAndRemove(req.params.id);
            const foundUser = await User.findOne({'dogs': req.params.id});
            foundUser.dogs.remove(req.params.id);
            await foundUser.save();
            res.render(`/users/${req.params.id}/edit`, {
                isLogged: req.session.logged
            });
        } catch(err) {
            res.send(err);
        }
    }
} 



module.exports = dogController;

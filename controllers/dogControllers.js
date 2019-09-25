const Dog = require('../models/dog')
const User = require('../models/User');


const dogController = {
    find: async (req, res) => {
        try {
            const Doggy = await Dog.find({});
            const People = await User.find({});
            res.render('dog/index.ejs', {
                    dogs : Doggy,
                    users : People,
                    user: req.session.username,
                    userId: req.session.userId,
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
                    isLogged: req.session.logged,
                    userId: req.session.userId,
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
        try {
            const user = await User.findOne({'username': req.body.username});
            if (!user) {
                req.session.message = 'Could not find that username';

                res.render('dog/new.ejs', {
                    message : req.session.message,
                    isLogged: req.session.logged,
                    userId: req.session.userId,
                })
            } else {
              const newDog = await Dog.create(req.body)
              user.pets.push(newDog)
              user.save((err, savedPet) => {
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

                if(err) {
                    console.log(err)
                }
                let pet = {}

                for (let i = 0; i < foundAPet.pets.length; i++) {
                    if (foundAPet.pets[i]._id.toString() === req.params.id.toString()) {
                      pet = foundAPet.pets[i];
                    }
                }
                res.render('dog/show.ejs', {
                    user : foundAPet,
                    dog : pet,
                    isLogged: req.session.logged,
                    userId: req.session.userId,
                })
            })
            
        } catch (err) {
            res.send(err)
        }
    },
    editOne: async (req, res) => {
        try {
            const foundDog = await Dog.findById(req.params.id)

            res.render('dog/edit.ejs', {
                dog : foundDog,
                isLogged: req.session.logged,
                userId: req.session.userId,
            })
        } catch (err) {
            throw(err)
        }
    },
    update: async (req, res) => {
        try {
            if(req.body.isHouseBroken === 'on'){
                req.body.isHouseBroken = true;
              } else if(req.body.isHouseBroken === 'off') {
                req.body.isHouseBroken = false;
              }
            const updateOne = await Dog.findByIdAndUpdate(req.params.id, req.body)
    
            res.redirect('/dog')
        } catch (err) {
            res.send(err)
        }
    },
    deleteDog: async (req, res) => {
        try{
            const deletedDog = await Dog.findByIdAndRemove(req.params.id);
            const foundUser = await User.findOne({'pets': req.params.id});
            foundUser.pets.remove(req.params.id);
            await foundUser.save();
            res.redirect(`/users/${foundUser._id}`)
        } catch(err) {
            res.send(err);
        }
    },
     about: async (req, res) => { 
        try {
           await  res.render('dog/about.ejs', {
            isLogged: req.session.logged,
            userId: req.session.userId
           }) 
        } catch (err) {
            console.log(err)
        }
    }
}


module.exports = dogController;

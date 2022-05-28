const { User } = require('../models');

const userController = {

    // create new User
    createUser({ body }, res) {
        User.create(body)
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
      },

    // get all Users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thought', 
            select: '-__v'})
        .populate({
            path: 'friends',
            select: '-__v'})
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get one User by id
    getUSerById({ params}, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts', 
            select: '-__v'})
        .populate({
            path: 'friends',
            select: '-__v'})
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData)) 
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },
    
};

module.exports = userController;
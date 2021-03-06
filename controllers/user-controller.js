const { User } = require('../models');

const userController = {

    // create new User
    createUser({ body }, res) {
        console.log('route hit');
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch((err) => res.json(err));
    },

    // get all Users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts', 
            select: '-__v'})
        .populate({
            path: 'friends',
            select: '-__v'})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get one User by id
    getUserById({ params}, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts', 
            select: '-__v'})
        .populate({
            path: 'friends',
            select: '-__v'})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData)) 
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // Update User by id
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No such User with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    },

    // delete User
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No such User with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // add new Friend
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id },{ $addToSet: { friends: params.friendsId }},{ new: true })
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(400).json(err));
      },
    
      // delete Friend
      removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id },{ $pull: { friends: params.friendsId }},{ new: true })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No such User with this id!" });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
    }
};

module.exports = userController;
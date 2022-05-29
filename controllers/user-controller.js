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
        User.findOneAndUpdate(
            {_id: params.userId},
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No such User with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    // delete Friend
    deleteFriend( { params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;
const router = require('express').Router();

// set up conditions from user-controller
const {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
  } = require('../../controllers/user-controller');

// set up Get, Put, Post, Delete to getAllUsers, createUsers, to Id, to Update, Delete, addFriend, deleteFriend
router
    .post(createUser)
    .route('/')
    .get(getAllUser);

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router; 
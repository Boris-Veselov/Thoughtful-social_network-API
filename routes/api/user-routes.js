const router = require('express').Router();

// set up conditions from user-controller
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
  } = require('../../controllers/user-controller');

// set up Get, Put, Post, Delete to getAllUsers, createUsers, to Id, to Update, Delete, addFriend, deleteFriend
router
.route("/")
.get(getAllUsers)
.post(createUser);
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)
// router.route('/user').get
module.exports = router; 
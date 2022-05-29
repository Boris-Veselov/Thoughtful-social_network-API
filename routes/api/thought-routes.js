const router = require('express').Router();

// set up conditions from thought-controller
const { 
    getAllThought, 
    getThoughtById, 
    createThought, 
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thought-controller');

// set up Get, Put, Post, Delete to getAllThought, createThought, to Id, to Update, Delete, addReaction, deleteReaction
router
    .route('/')
    .get(getAllThought);
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought); 
router
    .route('/:userId')
    .post(createThought);
router
    .route('/:thoughtId/reactions')
    .post(addReaction);
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;
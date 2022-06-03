const router = require('express').Router();

// set up conditions from thought-controller
const { 
    getAllThoughts, 
    getThoughtById, 
    createThought, 
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,

} = require('../../controllers/thought-controller');

// set up Get, Put, Post, Delete to getAllThought, createThought, to Id, to Update, Delete, addReaction, deleteReaction
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought); 
router
    .route('/:thoughtId/reactions')
    .post(addReaction);
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;
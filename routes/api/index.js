const router = require('express').Router();

// set up routes for user and thought routes
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// create this routes by adding "./user" and "./thought"
router.use('/user', userRoutes);
router.use('./thought', thoughtRoutes);

module.exports = router;
const router = require('express').Router();

// set up routes for user and thought routes
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// create this routes by adding "./user" and "./thought"
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
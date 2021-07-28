const router = require('express').Router();

const userRoutes = require('./user-routes');
const prodRoutes = require('./products-routes');

router.use('/users', userRoutes);
router.use('/products', prodRoutes);

module.exports = router;
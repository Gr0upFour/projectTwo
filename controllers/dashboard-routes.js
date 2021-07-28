const router = require('express').Router();
const sequelize = require('../config/connection');
//const { User, Product } = reqiuire('../models');
const withAuth = require('../utils/auth');

//Only routes here when user is logged in, displays all the user's products listed
router.get('/', withAuth, (req, res) => {

});

//Edit a product post
router.get('/edit/:id', withAuth, (req, res) => {

});

module.exports = router;
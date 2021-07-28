const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

//Home page route
router.get('/', (req, res) => {
    console.log(req.session);
    res.render('homepage');
});

//Login page route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;
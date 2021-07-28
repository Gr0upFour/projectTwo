const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product } = require('../models');
const withAuth = require('../utils/auth');

//Only routes here when user is logged in, displays all the user's products listed
router.get('/', withAuth, (req, res) => {
    Product.findAll({
        where: {
            //using ID from session
            created_by: req.session.created_by
        },
        attributes: [
            'id',
            'product_name',
            'price',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbProductData => {
            //data needs to be serialized before passing to template
            const prods = dbProductData.map(product => product.get({ plain: true }));
            res.render('dashboard', { prods, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        })
});

//Edit a product post
router.get('/edit/:id', withAuth, (req, res) => {
    const prods = dbPostData.get({ plain: true });

    res.render('edit-post', {
        prods,
        loggedIn: true
    });
});

module.exports = router;
const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Product } = require('../models');

//Home page route
router.get('/', (req, res) => {
    res.render('home-page');
    // console.log(req.session);
    // Product.findAll({
    //     attributes: [
    //         'id',
    //         'product_name',
    //         'descrip',
    //         'price',
    //         'category',
    //         'location',
    //         'created_at'
    //     ],
    //     include: [
    //         {
    //             model: User,
    //             attributes: ['username']
    //         }
    //     ]
    // })
    //     .then(dbPostData => {
    //         const prods = dbPostData.map(product => product.get({ plain: true }));
    //         res.render('homepage', { prods });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json(err);
    //     });
});

//Login page route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        console.log('hit')
        return;
    }
   
    res.render('sign-in');
    
});

//Register page route
router.get('/register', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
   
    res.render('register');
    
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});


//Single Product page route
router.get('/products/:id', (req, res) => {
    Product.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'product_name',
            'descrip',
            'price',
            'category',
            'location',
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
            if (!dbProductData) {
                res.status(404).json({ message: 'No post found with this id.' });
                return;
            }
            const product = dbProductData.get({ plain: true });
            res.render('single-product', {
                product,
                //allow for changing displayed information based on whether user is logged in or not
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;
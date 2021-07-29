const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User } = require('../models');

//Home page route
router.get('/', (req, res) => {
    console.log(req.session);
    res.render('homepage', {
        id: 1,
        product_name: 'nVidia RTX 3080',
        descrip: 'Brand new nVidia graphics card, still in box and sealed. Comes with receipt',
        price: 850,
        category: 'Electronics',
        location: 'Toronto',
        created_at: new Date(),
        user: {
            username: 'tony'
        }
    });
});

//Login page route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
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
    Post.findOne({
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
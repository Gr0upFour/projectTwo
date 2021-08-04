const router = require('express').Router();
const { Product, User } = require('../../models');
const withAuth = require('../../utils/auth');

//GET all product posts, sorted by newest first
router.get('/', (req, res) => {
    Product.findAll({
        attributes: ['id', 'product_name', 'price', 'category', 'location', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbProductData => {console.log(dbProductData);res.json(dbProductData)})
        //.then(dbProductData => console.log(dbProductData))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

//GET a single product post
router.get('/:id', (req, res) => {
    Product.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'product_name', 'descrip', 'price', 'category', 'location', 'created_by', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbProductData => {
            if (!dbProductData) {
                res.status(404).json({ message: 'No item found with this id.' });
                return;
            }
            res.json(dbProductData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

//POST a new product listing
router.post('/', (req, res) => {
    Product.create({
        product_name: req.body.product_name,
        descrip: req.body.descrip,
        price: req.body.price,
        category: req.body.category,
        location: req.body.location,
        created_by: req.body.created_by
    })
        .then(dbProductData => res.json(dbProductData))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

//PUT a new title, description, or price for existing listing
router.put('/:id', withAuth, (req, res) => {
    Product.update(
        {
            product_name: req.body.product_name,
            descrip: req.body.descrip,
            price: req.body.price
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbProductData => {
            if(!dbProductData) {
                res.status(404).json({ message: 'No item found with this id.' });
                return;
            }
            res.json(dbProductData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

//DELETE a product listing
router.delete('/:id', withAuth, (req, res) => {
    Product.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbProductData => {
            if(!dbProductData) {
                res.status(404).json({ message: 'No item found with this id.' });
                return;
            }
            res.json(dbProductData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;
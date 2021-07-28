const router = require('express').Router();
const { User } = require('../../models');

//GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exlude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
});

//GET /api/users/:id
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exlude: ['password']},
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
});

//POST /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
});

//POST /api/users/login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user exists with that email address.' });
            return;
        }

        //verify user password
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect password entered' });
            return;
        }
        res.json({ user: dbUserData, message: 'Successfully logged in.' });
    })
});

//POST /api/users/logout
router.post('/logout', (req, res) => {

});

//PUT /api/users/:id
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
});

//DELETE /api/users/:id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(error);
        });
});

module.exports = router;
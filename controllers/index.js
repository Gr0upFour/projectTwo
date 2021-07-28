const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

//error given when user tries to navigate to page that doesn't exist (ie: /api/soup or /dashboardz)
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
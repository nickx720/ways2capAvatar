const express = require('express');

const router = express.Router();
const userRoutes = require('./user');

router.get('/', (req, res) => {
    res.send('welcome to the development api');
});
router.use('/users', userRoutes);
module.exports = router;

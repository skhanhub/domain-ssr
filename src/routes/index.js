const express = require('express');

const usersController = require('../controllers/usersController');
const rootController = require('../controllers/rootController');

const router = express.Router();

router.get('/', rootController.getHomePage);

// API Routes
router.post('/submit', usersController.submit);

router.post('/update', usersController.update);

module.exports = router;

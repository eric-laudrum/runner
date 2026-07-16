const express = require('express');
const router = express.Router();
const runController = require('../controllers/runController');

router.post('/', runController.saveRun);
router.get('/user/:userId', runController.getUserRuns);

module.exports = router;
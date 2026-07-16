const express = require('express');
const router = express.Router();
const runController = require('../controllers/runController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, runController.saveRun);
router.get('/user/:userId', runController.getUserRuns);

module.exports = router;
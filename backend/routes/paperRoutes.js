const express = require('express');
const router = express.Router();
const { getSubjects, getPapers } = require('../controllers/paperController');
const { protectStudent } = require('../middleware/authMiddleware');

router.get('/subjects', protectStudent, getSubjects);
router.get('/', protectStudent, getPapers);

module.exports = router;

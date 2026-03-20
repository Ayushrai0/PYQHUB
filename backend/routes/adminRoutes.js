const express = require('express');
const router = express.Router();
const { login, addPaper, deletePaper, getAllPapers } = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/papers', protectAdmin, addPaper);
router.get('/papers', protectAdmin, getAllPapers);
router.delete('/papers/:id', protectAdmin, deletePaper);

module.exports = router;

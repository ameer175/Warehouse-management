const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { getConsumptionStats, getTopProducts, getMonthlyConsumption } = require('../controllers/statsController');

router.get('/consumption', verifyToken, getConsumptionStats);
router.get('/top-products', verifyToken, getTopProducts);
router.get('/monthly-consumption', verifyToken, getMonthlyConsumption);

module.exports = router;

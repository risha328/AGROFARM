const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin/adminController'); // Note: plural 'controllers'
const { authToken } = require('../middleware/authToken');

// Admin authentication routes
router.post('/signup', adminController.registerAdmin);
router.post('/signin', adminController.authAdmin);
router.post('/logout', adminController.logoutAdmin);

// Protected admin routes



module.exports = router;
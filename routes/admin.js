const express = require('express')
const adminMiddleware = require('../middleware/admin.middleware')
const router = express();
const AdminController = require('../controller/admin.controller')



router.post('/signin', AdminController.adminSignIn)
router.post('/signup', AdminController.adminSignUp)
router.post('/courses', adminMiddleware, AdminController.addAdminCourses)
router.get('/courses', adminMiddleware, AdminController.getAdminCourses)

module.exports = router;
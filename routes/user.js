const express = require('express');
const router = express()
const userMiddleware = require('../middleware/user.middleware')
const UserController = require('../controller/user.controller')


router.post('/signin', UserController.userSignIn)
router.post('/signup', UserController.userSignUp)
router.get('/courses', UserController.getUserCourses)
router.get('/courses/:courseId', userMiddleware, UserController.getCourseByCourseId)
router.get('/purchasedCourses', UserController.getPurchasedCourses)

module.exports = router;


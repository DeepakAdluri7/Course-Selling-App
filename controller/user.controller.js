const { User, Course } = require('../db/index')
const JWT_SECRATE = require('../config')
const jwt = require('jsonwebtoken')

const userSignIn = async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await User.find({ username, password })
    if (user.length) {
        const token = jwt.sign({ username }, JWT_SECRATE)
        res.json({
            token
        })
    } else {
        res.status(411).json({ msg: "invalid user or password" })
    }
}

const userSignUp = async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    await User.create({ username, password })

    res.json({ msg: " user saved successfully" })
}

const getUserCourses = async (req, res) => {
    const courses = await Course.find({})
    res.json({
        response: courses
    })
}

const getCourseByCourseId = async (req, res) => {
    const courseId = req.params.courseId
    const username = req.username
    try {
        await User.updateOne({ username: username }, { "$push": { purchasedCourses: courseId } })
    } catch (err) {
        console.log(err)
    }

    res.json({ msg: "added success fully" })
}

const getPurchasedCourses = async (req, res) => {
    const user = await User.findOne({ username: req.headers.username });
    const courses = await Course.find({
        _id: { '$in': user.purchasedCourses }
    })
    res.json({
        courses: courses
    })
}


const UserController = { userSignIn, userSignUp, getUserCourses, getCourseByCourseId, getPurchasedCourses }
module.exports = UserController
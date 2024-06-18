const { Admin, Course } = require('../db/index')
const jwt = require('jsonwebtoken')
const JWT_SECRATE = require('../config')

const adminSignIn = async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await Admin.find({ username, password })
    if (user) {
        const token = jwt.sign({ username }, JWT_SECRATE)
        res.json({
            token
        })
    } else {
        res.status(411).json({ msg: "invalid user or password" })
    }

}

const adminSignUp = async (req, res, next) => {
    try {
        const username = req.body.username
        const password = req.body.password
        const isExist = await Admin.findOne({ username: username })
        if (!isExist) {
            await Admin.create({ username, password })
            res.json({ msg: "Successfully saved" })
        } else {
            res.json({ msg: "user already exist" })
        }
    } catch (err) {
        next(err)
    }
}

const addAdminCourses = async (req, res) => {
    const title = req.body.title
    const description = req.body.description
    const imageLink = req.body.imageLink
    const price = req.body.price

    const newCourse = await Course.create({ title, description, imageLink, price })

    res.json({ msg: "Successfully saved", courseId: newCourse._id })


}
const getAdminCourses = async (req, res) => {
    const courses = await Course.find({})
    res.json({
        response: courses
    })


}



const AdminController = { adminSignIn, adminSignUp,addAdminCourses, getAdminCourses }
module.exports = AdminController
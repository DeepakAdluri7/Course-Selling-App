const { Admin } = require('../db/index')
const jwt_secrate = require('../config')
const jwt = require('jsonwebtoken')

function adminMiddleware(req, res, next) {


    const token = req.headers.authorization
    if (!token) {
        res.status(403).json({
            msg: "provide token"
        })
        return
    }
    const tokenWords = token.split(' ');
    const jwtToken = tokenWords[1];
    try {
        const validUser = jwt.verify(jwtToken, jwt_secrate)
        if (validUser.username) {
            console.log(validUser)
            req.username = validUser.username
            next();
        } else {
            res.status(403).json({
                msg: "admin not exist"
            })
        }
    } catch (err) {
        res.status(403).json({
            msg: err
        })
        return;
    }





}

module.exports = adminMiddleware
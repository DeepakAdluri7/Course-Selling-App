function errorHandler(err, req, res, next) {
    if (err.name == 'ValidationError') {
        res.status(400).json({err : err.message})
    }
    next(err);
}


module.exports = errorHandler
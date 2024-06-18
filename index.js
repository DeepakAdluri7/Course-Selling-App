const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 3002;

const errorHandler = require('./middleware/errorhandler.middleware')

const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')

app.use(bodyParser.json())

app.use('/admin', adminRouter)
app.use('/user', userRouter)

app.use(errorHandler)




app.listen(PORT, ()=>{
    console.log(`app listening on ${PORT}`)
})
 
const express =require('express')
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())


const errorMiddleware = require("./middleware/error")
const user = require("./routes/userRoutes")




app.use("/api/course/v1/",user)
app.use(errorMiddleware)

 

module.exports = app
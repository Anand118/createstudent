const app= require('./app')
const dotenv   = require('dotenv')
dotenv.config({path:"./config/config.env"})
const databaseConn =require('./config/database')



const PORT = process.env.PORT

// database connection call after config
databaseConn()

const server = app.listen(PORT, ()=>{
    console.log("connection succesfull")
}) 
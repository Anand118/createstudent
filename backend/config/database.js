const mongoose = require('mongoose')

const DatabaseConn = ()=>{
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log('database connection succesfull')
    })
} 
module.exports = DatabaseConn
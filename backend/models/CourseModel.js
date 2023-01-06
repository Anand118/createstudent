const mongoose = require('mongoose')

const courseSchema  =  new mongoose.Schema({
    course:{
       type:String ,
       required:[true,"please enter Your Name"],
      
    },
    price:{
        type:String ,
        required:[true,"please enter Your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email address"]
    },
    session:{
        type:String,
        require:[true,"please enter your password"],
        minLength:[8,"password should be more than 8 character"],
        select:false
    },


})
courseSchema.set('timestamps',true)


module.exports =mongoose.model("AllUser",alluserSchema)
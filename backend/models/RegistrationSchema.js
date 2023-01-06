const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registrationSchema  =  new mongoose.Schema({
    name:{
       type:String ,
       required:[true,"please enter Your Name"],
       maxLength:[30,"name cannot excced 30 character"],
       minLength:[8,"Name should be more than 8 character"]
    },
    email:{
        type:String ,
        required:[true,"please enter Your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email address"]
    },
    password:{
        type:String,
        require:[true,"please enter your password"],
        minLength:[8,"password should be more than 8 character"],
        select:false
    },



    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})


registrationSchema.pre('save', async function(next){
    if(!this.isModified('password')){    
   next();
    }
    this.password = await bcrypt.hash(this.password, 10);

});

registrationSchema.methods.getJWTTOKEN = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
};

registrationSchema.methods.comparePassword = async function(enteredPassword){  
    return await bcrypt.compareSync(enteredPassword,this.password)
       
    }



    
module.exports = mongoose.model("registration",registrationSchema)
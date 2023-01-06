const User = require("../models/RegistrationSchema");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");


exports.home = catchAsyncErrors(async (req, res, next) => {
    
   res.render("index")
  });


exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
    
    });
   res.send("index")
  });



  exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;
    
    //   //checking if user has given password and email both
      if (!email || !password) {
        return next(new ErrorHander("Please enter email and password", 400));
      }
    
       const user = await User.findOne({email}).select("+password") 
       if (!user) {
            return next(new ErrorHander("Invalid email or password", 401));
          } 
    
        const isPasswordMatched = await user.comparePassword(password)   
        if(!isPasswordMatched){
            return next(new ErrorHander("Password is incorrect", 400))
        }
         sendToken(user,200,res)
        
    });
    
    exports.logout = catchAsyncErrors(async (req, res, next) => {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
    
      res.status(200).json({
        success: true,
        message: "logged out succesfully",
      });
    });
    


    exports.getUserDetails =  catchAsyncErrors( async (req,res,next)=>{
        const user =await User.findById(req.user.id)
       
        res.status(200).json({
           success:true,
           user
        })
       })
       
       
       exports.updatePassword = catchAsyncErrors(async (req,res,next)=>{
           const user = await User.findById(req.user.id).select("+password")  
           const isPasswordMatched = await user.comparePassword(req.body.oldPassword)   
           if(!isPasswordMatched){
               return next(new ErrorHander("Old Password is incorrect", 400))
           }
       
           if(req.body.newPassword !== req.body.confirmPassword){
               return next(new ErrorHander("password does not match", 400))
           }
           user.password = req.body.newPassword
           await user.save()
       
          sendToken(user,200,res)
           
       })
       
       exports.updateProfile = catchAsyncErrors( async (req,res,next)=>{
       const newUserData = {
           name : req.body.name,
           email : req.body.email
       }
       
       const user = await User.findByIdAndUpdate(req.user.id,newUserData, {new:true,runValidators:true})
       
       res.status(200).json({
           success:true,
           user
       })
       
       })
       
       //    Get all users (admin)
       exports.getAllStudent = catchAsyncErrors(async (req,res,next)=>{
           const students = await User.find()
       
           res.status(200).json({
               success:true,
               students
           })
       })
       // /    Get single users (admin)
       exports.getSingleStudent = catchAsyncErrors(async (req,res,next)=>{
           const student = await User.findById(req.params.id)
       
           if(!student){
               return next(new ErrorHander(`Student does not exist with this id: ${req.params.id}`, 400))
           }
       
           await student.remove()
           res.status(200).json({
               success:true,
               student
           })
       })
       
       //  Update User Role -Admin
       exports.updateUserRole = catchAsyncErrors( async (req,res,next)=>{
           const newUserData = {
               name : req.body.name,
               email : req.body.email,
               role : req.body.role
           }
           
           const user = await User.findByIdAndUpdate(req.params.id,newUserData, {new:true,runValidators:true})
           
           res.status(200).json({
               success:true,
               user
           })
           
           })
       
           // /  Delete User Role - Admin
       exports.deleteStudent = catchAsyncErrors( async (req,res,next)=>{
           
           
           const student = await User.findByIdAndDelete(req.params.id)
           if(!student){
               return next(new ErrorHander(`student does not exist with this id: ${req.params.id}`, 400))
           }
       
           res.status(200).json({
               success:true,
               message:"Student deleted successfully"
               
           })
           
           })
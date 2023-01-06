const Course  =require("../models/CourseModel")
const ErrorHander = require("../utils/errorhander")
const catchAsyncErrors = require("../middleware/catchAsyncError")


exports.createCourse  = catchAsyncErrors(async (req,res,next)=>{

    req.body.user = req.user.id
     const course = await Course.create(req.body)
     res.status(201).json({
         success:true,
         course
     })
 })
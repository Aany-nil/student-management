const Course = require("../models/Course");



const createCourse = async (req, res) => {
    try {
     const { teacherId, title, code, description, credit, course, teacher } = req.body;
     
     if(!teacherId || !title || !code) {
     return res.status(400).json({
       success: false,
       message: "teacherId, title & code are required",
       error: error.message,
     });
   }

   const courseCreated = new Course({
    teacherId,
    title,
    code,
    description,
    credit,
    teacher,
    course
   });

  await courseCreated.save();

   return res.status(201).json({
    success: true,
    message: "course create is complete",
    data: courseCreated,
   });

    } catch (error) {
     return res.status(500).json({
        success: false,
        message: "course created is not completed",
        error: error.message,
     })    
    }
}


const getAllCourse = async (req, res) => {
    try {
      const allCourse = await Course.find()
      .populate("teachers", "name email")
      .populate("students", "name email");

      res.status(200).json({
        success: true,
        message: "Course retrieve successfully",
        data: allCourse,
      })  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Course retrieve error",
            error: error.message,
        });     
    }
}

const updateCourse = async (req, res) => {
    try {
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            returnDocument: "after",
            runValidators: true,
        }
      );
      
      if(!updatedCourse) {
        return res.status(404).json({
            success: false,
            message: "course is not found",
            error: error.message,
        });
    }

     res.status(200).json({
        success: true,
        message: "Course update is successfully",
        data: updatedCourse,
    });
  } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
        
    }
}

const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        await Course.findByIdAndDelete(id);
        
        if(!deleteCourse) {
        return res.status(404).json({
          success: false,
          message: error.message,  
            });
        }

       res.status(200).json({
         success: true,
         message: "Course delete successfully",
        data: deleteCourse,
       })
    } catch (error) {
        res.status(500).json({
         success: false,
         message: "course deleted failed",
         error: error.message,
        });       
    }
}

module.exports = { createCourse, getAllCourse, updateCourse, deleteCourse }
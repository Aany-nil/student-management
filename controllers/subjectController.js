const Subject = require("../models/Subject");


// Create Subject
const createSubject = async (req, res) => {
  try {
    const { creatorId, name, code, credit, description, teacher } = req.body;

     if (!creatorId || !name || !code) {
      return res.status(400).json({
        success: false,
        message: "creatorId, name and code are required.",
      });
    }
   
    const subject = new Subject({
      creatorId,
      name,
      code,
      credit,
      description,
      teacher,
    });

    await subject.save();

    return res.status(201).json({
      success: true,
      message: "Subject created successfully.",
      data: subject
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create subject.",
      error: error.message,
    });
  }
};

// Get All Subjects
const getAllSubject = async (req, res) => {
  try {
    const subject = await Subject.find();
    res.status(200).json({
      success: true,
      message: "Subject retrieved successfully.",
      data: subject
      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve subject",
      error: error.message,
    });
  }
};

// Delete Subject
const deleteSubject = async (req, res) => {
      const { id } = req.params;
    try {
         await Subject.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "subject delete successfully",
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "subject delete failed.",
            error: error.message,
          });
    }
  }

module.exports = {
  createSubject,
  getAllSubject,
  deleteSubject

};
const Subject = require("../models/Subject");


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

const updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runvalidators: true,
      }
    );

    if(!subject) {
      return res.status(404).json({
        success: false,
        message: "subject not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "subject updated successfully",
      data: subject,
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
    
  };

};

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

const subjectById = async (req, res) => {
  try {
    let id = req.params;
    const subjectInfo = await Subject.findById(id.id);
        
        return res.status(200).json({
          success: true,
          message: "subject retrieved successfully.",
          data: subjectInfo,
        });
        
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve subject",
      error: error.message,
    });
  }
};

module.exports = {
  createSubject,
  getAllSubject,
  updateSubject,
  deleteSubject,
  subjectById,
};
const Subject = require("../models/Subject");
const Class = require("../models/Class")
const User = require("../models/User");



const createClass = async (req, res) => {
  try {
    const { creatorId, name, code, section,teacher, subjects } = req.body;

    if (!creatorId || !name || !code || !section) {
      return res.status(400).json({
        success: false,
        message: "creatorId, name, code and section are required.",
      });
    }

    const newClass = new Class({
      creatorId,
      name,
      code,
      section,
      teacher,
      subjects,
    });

    await newClass.save();

    return res.status(201).json({
      success: true,
      message: "Class created successfully.",
      data: newClass,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create class.",
      error: error.message,
    });
  }
};

const getAllClasses = async (req, res) => {
  try {
    const allClasses = await Class.find()
      .populate("creatorId", "name email")
      .populate("teacher", "name email")
      .populate("students", "name email")
      .populate("subjects.subject", "name code credit")
      .populate("subjects.teacher", "name email");

    res.status(200).json({
      success: true,
      message: "Classes retrieved successfully.",
      data: allClasses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateClass = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedClass = await Class.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("creatorId", "name email")
      .populate("teacher", "name email")
      .populate("students", "name email")
      .populate("subjects.subject", "name code")
      .populate("subjects.teacher", "name email");

    if (!updatedClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: updatedClass,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  createClass,
  getAllClasses,
  updateClass,
};





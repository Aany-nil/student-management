const Subject = require("../models/Subject");
const Class = require("../models/Class")
const User = require("../models/User");



const createClass = async (req, res) => {
  try {
    const { creatorId, subjectId, name, code, section } = req.body;

    if (!creatorId || !subjectId || !name || !code || !section) {
      return res.status(400).json({
        success: false,
        message: "creatorId, subjectId, name, code and section are required.",
      });
    }

    const newClass = new Class({
      creatorId,
      name,
      code,
      section,
      subjects: subjectId,
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

module.exports = {
  createClass,
};





const Subject = require("../models/Subject");

function formatSubject(subject) {
  return {
    id: subject._id,
    name: subject.name,
    code: subject.code,
    credit: subject.credit,
    description: subject.description,
    teacher: subject.teacher,
    createdAt: subject.createdAt,
  };
}

// Create Subject
const createSubject = async (req, res) => {
  try {
    const { name, code, credit, description, teacher } = req.body;

    const existingSubject = await Subject.findOne({
      $or: [{ name }, { code }],
    });

    if (existingSubject) {
      return res.status(400).json({
        success: false,
        message: "Subject already exists.",
      });
    }

    const subject = await Subject.create({
      name,
      code,
      credit,
      description,
      teacher,
    });

    return res.status(201).json({
      success: true,
      message: "Subject created successfully.",
      data: {
        subject: formatSubject(subject),
      },
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
const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Subjects retrieved successfully.",
      data: {
        subjects: subjects.map(formatSubject),
        count: subjects.length,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve subjects.",
      error: error.message,
    });
  }
};

// Get Subject By ID
const getSubjectById = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subject retrieved successfully.",
      data: {
        subject: formatSubject(subject),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve subject.",
      error: error.message,
    });
  }
};

// Update Subject
const updateSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    Object.assign(subject, req.body);

    await subject.save();

    return res.status(200).json({
      success: true,
      message: "Subject updated successfully.",
      data: {
        subject: formatSubject(subject),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update subject.",
      error: error.message,
    });
  }
};

// Delete Subject
const deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const subject = await Subject.findById(subjectId);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: "Subject not found.",
      });
    }

    await Subject.findByIdAndDelete(subjectId);

    return res.status(200).json({
      success: true,
      message: "Subject deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete subject.",
      error: error.message,
    });
  }
};

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
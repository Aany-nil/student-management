const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "creator is required"]
  },
  code: {
    type: String,
    required: [true, "course code is required"],
    unique: true,
    uppercase: true,
    trim: true,
  },
  credit:{
    type: Number,
    required: false,
  },
  description: {
    type: String,
    default: "",
  },
  teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
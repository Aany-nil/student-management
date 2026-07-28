const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "creator id is required"]

    },

    name: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
    },

    code: {
      type: String,
      required: [true, "Subject code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },

    credit: {
      type: Number,
      required: false,
    },

    description: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Subject", subjectSchema);
const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "creator id is required"]

    },

    name: {
      type: String,
      required: [true, "class name is required"],
      trim: true,
    },

    code: {
      type: String,
      required: [true, "class code is required"],
      unique: true,
      trim: true,
    },
    section: {
       type: String,
       trim: true,
    },
    subjects: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "Subject",
         required: true,
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Class", classSchema);
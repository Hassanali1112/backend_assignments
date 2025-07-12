const mongoose = require("mongoose")

const couseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    cnic: {
      type: String,
      unique : true,
      require: true,
    },
    courseSelect: {
      type: String,
      require: true,
    },
    campus: {
      type: String,
      require: true,
    },
    timeSlot: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    agreement: {
      type: Boolean,
      require: true,
      default: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", couseSchema)

module.exports = Course

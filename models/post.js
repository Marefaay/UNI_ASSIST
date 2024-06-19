const mongoose = require("mongoose");
const Joi = require("joi");

// post Schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
      trim: true,
      minlength: 5,
      maxlength: 200,
    },
    description: {
      type: String,
      // required: true,
      trim: true,
      minlength: 10,
    },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "prof-profAssist",
      // required: true,
    },
    generatedAt: String,
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timesstamps: true,
  }
);

//post model
const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;

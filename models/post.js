const mongoose = require("mongoose");
const Joi = require("joi");

// post Schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "prof-profAssist",
      required: true,
    },
    Image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
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
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);

//post model
const postModel = mongoose.model("Post", postSchema);
module.exports = postModel;

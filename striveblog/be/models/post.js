const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
      default: "General",
    },
    cover: {
      type: String,
      required: false,
      default: "#",
    },
    readTime: {
      value: {
        type: Number,
        required: true,
      },
      timeUnit: {
        type: String,
        required: true,
        enum: ["h", "min"],
      },
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
        required: false,
        default: "#",
      },
    },
  },
  { timestamps: true, strict: true }
);

// Esportiamo il modello
module.exports = mongoose.model("postModel", PostsSchema, "striveposts");

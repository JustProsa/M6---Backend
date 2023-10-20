const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
    default: "#",
  },
  author: {
    type: AuthorSchema,
    required: true,
  },
});

// In questo caso abbiamo creato i nostri modelli assieme e abbiamo passato nel campo di nostro interesse (author) tutto lo schema AuthorSchema --> EMBEDDING

module.exports = mongoose.model("authorModel", AuthorSchema, "authorsprova");

module.exports = mongoose.model("postModel", PostSchema, "postprova");

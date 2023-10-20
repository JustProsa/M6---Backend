const mongoose = require("mongoose");

// Schema è il metodo di mongoose che definisce la struttura di un oggetto da inserire nel db
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
      default: "#", //url dell'img di base prima che se ne scelga una
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    rate: {
      type: Number,
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      // Gli stiamo dicendo che l'autore del post va preso usando come riferimento il modello UserModel
    },
  },
  { timestamps: true, strict: true }
);

// Esportiamo il modello
module.exports = mongoose.model("postModel", PostsSchema, "posts");

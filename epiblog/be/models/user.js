const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8, // numero minimo di caratteri
    },
    role: {
      type: String,
      enum: ["user", "admin", "editor"], //accetterà solo questi tre tipi di stringa per questo elemento
      default: "user",
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("userModel", UserSchema, "users");

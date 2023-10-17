const express = require("express");
const UserModel = require("../models/user");
const users = express.Router();

users.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res
      .status(200)
      .send({ statusCode: 200, message: "Users find correctly", users });
  } catch (error) {
    res
      .status(500)
      .send({ statusCode: 500, message: "Internal server error", error });
  }
});

module.exports = users;

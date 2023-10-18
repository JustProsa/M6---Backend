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

users.post("/users/create", async (req, res) => {
  const newUser = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthDay: req.body.birthDay,
    password: req.body.password,
    role: req.body.role,
    avatar: req.body.avatar,
  });
});

module.exports = users;

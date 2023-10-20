const express = require("express");
const UserModel = require("../models/user");
const users = express.Router();
const bcrypt = require("bcrypt"); //importiamo la libreia per il criptaggio della psw

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
  const salt = await bcrypt.genSalt(10); //questa è la complessità dell' algoritmo che vogliamo utilizzare (10 è il massimo)
  const hashedPassword = await bcrypt.hash(req.body.password, salt); //metodo che andrà a generare la PSW criptata con 2 parametri, il primo è cosa deve criptare, il secondo è con che algoritmo criptarla, che noi abbiamo definito in salt

  const newUser = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    birthDay: req.body.birthDay,
    password: hashedPassword, //non è più req.body.password, ma la password criptata
    role: req.body.role,
    avatar: req.body.avatar,
  });

  try {
    const user = await newUser.save();

    res.status(201).send({
      statusCode: 201,
      message: "User saved successfully",
      payload: user,
    });
  } catch (error) {
    res
      .status(500)
      .send({ statusCode: 500, message: "Internal server error", error });
  }
});

module.exports = users;

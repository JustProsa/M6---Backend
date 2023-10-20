const express = require("express");
const login = express.Router();
const bcrypt = require("bcrypt"); // serve nel login per controllare che la psw messa corrisponda
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

login.post("/login", async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email }); //dobbiamo recuperare l'utente che fa il login tramite la sua email

  if (!user) {
    return res.status(404).send({ statusCode: 404, message: "User NOT FOUND" });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password); //controlliamo la validità della psw con 2 parametri, la psw ricevuta dall'utente tramite il login; il secondo è la password dell'utente che abbiamo trovato tramite la mail.

  if (!validPassword) {
    return res.status(400).send({
      statusCode: 400,
      message: "Email o password errati",
    });
  }

  const token = jwt.sign(
    {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  ); // per creare il TOKEn di autent. usiamo jwt.sign( che accetta un oggetto che conterrà tutto ciò che dell' utente vogliamo torni criptato nel token). Come seconda cosa gli passiamo la nostra chiave segreta del database, e come terza un oggetto con un elemento expiresIn, che andrà ad indicare quanto vogliamo che il TOKEN duri.

  res.header("Authorization", token).status(200).send({
    message: "Login effettuato con successo",
    statusCode: 200,
    token,
  });

  try {
  } catch (error) {}
});

module.exports = login;

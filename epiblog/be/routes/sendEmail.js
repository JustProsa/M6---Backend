const express = require("express");
const { createTransport } = require("nodemailer");
const email = express.Router();

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "noemy.frami@ethereal.email",
    pass: "35fDHcGt2a4GpGH4US",
  },
});

email.post("/send-email", async (req, res) => {
  const { subject, text } = req.body;
  const mailOptions = {
    from: "noreply@bubibubi.com",
    to: "noemy.frami@ethereal.email",
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Errore durante l'invio della mail");
    } else {
      console.log("email inviata");
      res.status(200).send("Email inviata correttamente");
    }
  });
});

module.exports = email;

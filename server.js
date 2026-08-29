const express = require("express");
const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/subscribe", async function (req, res) {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({
      message: "Please enter an email"
    });
  }

  const message = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: "Welcome to DEV@Deakin",
    text: "Welcome to DEV@Deakin. Thank you for subscribing!"
  };

  try {
    const response = await sgMail.send(message);
    console.log("Email sent successfully!");
    console.log("SendGrid status:", response[0].statusCode);

    res.status(200).json({
      message: "Subscribed successfully! Check your email."
    });
  } catch (error) {
    console.log(error.response.body);
    res.status(500).json({
      message: "Error sending email"
    });
  }
});

app.listen(3000, function () {
  console.log("Server running on http://localhost:3000");
});
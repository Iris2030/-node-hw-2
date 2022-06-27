const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const PORT = process.env.PORT;

const BASE_URL = `http://localhost:${PORT}/api`;

console.log(BASE_URL);
const sendEmail = async (userEmail, code) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const verificatonLink = `${BASE_URL}/users/verify/${code}`;

  const msg = {
    to: userEmail,
    from: "ibazhinova@gmail.com",
    subject: "Email conformation",
    text: "Please confirm your email",
    html: `<h4>Click on this link to verify your registration ${verificatonLink}</h4>`,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendEmail };

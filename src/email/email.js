require("dotenv").config();
const nodemailer = require("nodemailer");
const { M_USER, M_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: M_USER,
    pass: M_PASS,
  },
});

const sendEmail = async (to, html) => {
  const info = await transporter.sendMail({
    from: "mateusbieda@gmail.com",
    to,
    subject: "Thanks for subscribing",
    html: `<div style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
        <h1>Thank You!</h1>
        <p>Thank you for subscribing So Yummy newsletter.</p>
        <p>
          We're excited to keep you updated with our latest news and offers.
        </p>
      </div>`,
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = { sendEmail };

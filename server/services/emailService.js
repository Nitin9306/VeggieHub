const axios = require("axios");

console.log("BREVO KEY:", process.env.BREVO_API_KEY ? "Loaded" : "Missing");

const sendResetEmail = async (toEmail, resetLink) => {
  try {

    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "VeggieHub Support",
          email: "veggiehub.support@gmail.com"
        },

        to: [
          {
            email: toEmail
          }
        ],

        subject: "Reset Your VeggieHub Password",

        htmlContent: `
        <div style="
          font-family:Arial, Helvetica, sans-serif;
          background:#f6f8f6;
          padding:30px;
        ">

          <div style="
            max-width:600px;
            margin:auto;
            background:white;
            padding:30px;
            border-radius:12px;
            box-shadow:0 4px 15px rgba(0,0,0,0.08);
          ">

            <h1 style="
              color:#15803D;
              text-align:center;
              margin-bottom:10px;
            ">
              VeggieHub
            </h1>

            <h2 style="
              color:#333;
              text-align:center;
            ">
              Password Reset Request
            </h2>


            <p style="color:#555;font-size:16px;">
              Hello,
            </p>


            <p style="
              color:#555;
              font-size:16px;
              line-height:1.6;
            ">
              We received a request to reset your VeggieHub account password.
              Click the button below to create a new password.
            </p>


            <div style="
              text-align:center;
              margin:30px 0;
            ">

              <a href="${resetLink}"
              style="
                background:#15803D;
                color:white;
                padding:14px 28px;
                text-decoration:none;
                border-radius:8px;
                font-weight:bold;
                display:inline-block;
              ">
                Reset Password
              </a>

            </div>


            <p style="
              color:#666;
              font-size:14px;
              line-height:1.5;
            ">
              This password reset link will expire in 15 minutes.
            </p>


            <p style="
              color:#666;
              font-size:14px;
            ">
              If you did not request a password reset, please ignore this email.
              Your account is safe.
            </p>


            <hr style="border:none;border-top:1px solid #eee;margin:25px 0;">


            <p style="
              text-align:center;
              color:#999;
              font-size:13px;
            ">
              © 2026 VeggieHub. All rights reserved.
            </p>


          </div>

        </div>
        `
      },

      {
        headers:{
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type":"application/json"
        }
      }
    );

    console.log("✅ Email Sent Successfully");

  } catch(error){

    console.log(
      "Email Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};


module.exports = { sendResetEmail };
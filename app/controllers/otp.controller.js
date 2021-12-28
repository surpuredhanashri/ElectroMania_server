const db = require("../models");
const User = db.userTable;
const Otp = db.otpTable;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
//send otp

exports.sendOtp = (req, res) => {
  let data = User.findOne({
    where: {
      useremail: req.body.useremail,
    },
  });
  data.then((user) => {
    if (!user) {
      res.status(400).send({
        message: "User Not Found",
      });
    } else {
      let otpdata = Math.floor(100000 + Math.random() * 900000);
      let data = Otp.create({
        otp: otpdata,
        useremail: req.body.useremail,
        expiresIn: new Date(new Date().getTime() + 300 * 1000),
      });
      data
        .then((otp) => {
          res.status(200).send({
            message: "Otp Sent, Please check your mail ID",
          });
          mailer(req.body.useremail, otpdata);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while sending otp, Try again.",
          });
        });
    }
  });
};

//verify otp and reset password
exports.verifyOtp = (req, res) => {
  let data = Otp.findOne({
    where: {
      useremail: req.body.useremail,
      otp: req.body.otp,
      expiresIn: {
        [Op.gt]: new Date(),
      },
    },
  });
  data
    .then((otp) => {
      if (!otp) {
        res.status(400).send({
          message: "Otp Expired",
        });
      } else {
        let data = User.update(
          {
            password: bcrypt.hashSync(req.body.password, 8),
          },
          {
            where: {
              useremail: req.body.useremail,
            },
          }
        );
        data
          .then((user) => {
            res.status(200).send({
              message: "Password Changed Successfully",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while verifying otp, Try again.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while verifying otp, Try again.",
      });
    });
};

//using nodemailer

const mailer = (useremail, otp) => {
  var nodemailer = require("nodemailer");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "demou9521@gmail.com",
      pass: "demouser123",
    },
  });

  var mailOptions = {
    from: "demou9521@gmail.com",
    to: useremail,
    subject: "OTP for Reset Password",
    text: "Your OTP is " + otp,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

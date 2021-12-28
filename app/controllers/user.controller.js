const db = require("../models");
const User = db.userTable;
const Op = db.Sequelize.Op;
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const details = require("../details.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { user } = require("../db.Config");

exports.create = (req, res) => {
  const user = {
    useremail: req.body.useremail,
    username: req.body.username,
    userphoneno: req.body.userphoneno,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error Creating cart",
      });
    });
};
exports.findAll = (req, res) => {
  console.log("Get All Cart");
  User.findAll()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.error("There is an error getting data from db: " + err);
      res.send(err);
    });
};

exports.createmail = (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, (info) => {
    console.log(`The mail has sent and the id is ${info.messageId}`);
    res.send(info);
  });
};


exports.login = (req, res) => {
  if (!req.body.useremail || !req.body.password) {
    res.status(400).send({
      message: "Atleast Enter email and password",
    });
    return;
  }
  User.findOne({
    where: {
      useremail: req.body.useremail,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User Not Found",
        });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      const token = jwt.sign({ id: user.id }, "secret", { expiresIn: 86400 });
      res.status(200).send({
        id: user.id,
        useremail: user.useremail,
        token: token,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User",
      });
      console.log(err);
    });
};

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password,
    },
  });

  let mailOptions = {
    from: '"<example.gimail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Thanks for registering with ElectroMania", // Subject line
    html: `<h1>Hi ${user.name}</h1><br>
    <h3 style="text-align: center;">Thank You For Choosing Us!!!</h3>
    <img style="margin-left:12%"  src="https://i.pinimg.com/564x/1d/2b/0d/1d2b0da44ed59d0a4cf34bbb2d1f65a1.jpg">
      <h4 style="text-align: center;">We are Happy to serve you with our best services 😊😊😊</h4>
  <h2 style="text-align: center;">Buy our amazing products with lowest Price.</h2> 
  <p>In case you need any support, you can write to surpuredhanashri@gmail.com</p>
 
  <strong>ElectroMania team 😊</strong>
  
        `,
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

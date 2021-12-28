module.exports = (app) => {
    const otps = require("../controllers/otp.controller");
  
    var router = require("express").Router();
  
    router.post("/sendmail", otps.sendOtp);
  
    router.post("/verify", otps.verifyOtp);
  
    app.use("/reset", router);
  };
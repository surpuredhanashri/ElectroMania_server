module.exports = (app) => {
  const user = require("../controllers/user.controller");

  var router = require("express").Router();

  router.post("/register", user.create);
  router.get("/getAll", user.findAll);
  router.post("/sendmail", user.createmail);

  router.post("/login", user.login);

  app.use("/user", router);
};

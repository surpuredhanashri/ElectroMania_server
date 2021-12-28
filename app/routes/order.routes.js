module.exports = (app) => {
  const order = require("../controllers/order.controller");

  var router = require("express").Router();

  router.post("/", order.create);
  router.get("/Allorder", order.findAll);
  // router.get("/AllUsercart/:name",order.findOne);
  // router.put("/updateAllcart",order.update)
  // router.put("/updatedelAllcart",order.update1)
  // router.delete("/deleteData/:id",order.delete)
  // router.delete("/deleteDataByCartId",order.deleteAll)

  app.use("/order", router);
};

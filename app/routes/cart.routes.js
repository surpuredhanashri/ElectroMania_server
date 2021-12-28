module.exports = (app) => {
    const cart = require("../controllers/cart.controller")
  
    var router = require("express").Router();
  
    router.post("/", cart.create);
    router.get("/Allcart",cart.findAll);
    router.get("/AllUsercart/:name",cart.findOne);
    router.put("/updateAllcart",cart.update)
    router.put("/updatedelAllcart",cart.update1)
    router.delete("/deleteData/:id",cart.delete)
    router.delete("/deleteDataByCartId",cart.deleteAll)
    
    app.use("/cart", router);
  };
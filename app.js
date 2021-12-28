const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./app/models");
db.sequelize.sync();
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
const authjwt = require("./app/helpers/authjwt");
app.use(authjwt());

app.use(bodyParser.json());
app.get("/", function (req, res) {
  console.log("Hi");
  res.send("hi");
});
require("./app/routes/product.routes")(app);
require("./app/routes/cart.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/otp.routes")(app);
require("./app/routes/order.routes")(app);
app.listen(8000, function () {
  console.log("Server is listening at http://localhost:8000");
});

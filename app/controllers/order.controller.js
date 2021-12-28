const db = require("../models");
const Order = db.orderTable;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const order = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    img: req.body.img,
    name: req.body.name,
  };

  Order.create(order)
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
  Order.findAll()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.error("There is an error getting data from db: " + err);
      res.send(err);
    });
};

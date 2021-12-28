const db = require("../models");
const Cart = db.cartTable;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const cart = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    img: req.body.img,
    name: req.body.name,
  };

  Cart.create(cart)
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
  Cart.findAll()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.error("There is an error getting data from db: " + err);
      res.send(err);
    });
};
exports.findOne = (req, res) => {
  var name = req.params.name;
  //  console.log(name)
  Cart.findAll({ where: { name: name }, raw: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error("Error" + err);
    });
};
exports.update = (req, res) => {
  id = req.body.id;
  title = req.body.title;
  description = req.body.description;
  price = req.body.price;
  quantity = req.body.quantity;
  img = req.body.img;
  name = req.body.name;

  Cart.update(
    {
      id: id,
      title: title,
      description: description,
      price: price,
      quantity: quantity + 1,
      img: img,
      name: name,
    },
    { where: { id: id, name: name } }
  )
    .then((data) => {
      Cart.findAll({ where: { name: name, id: id }, raw: true }).then(
        (data) => {
          res.send(data);
        }
      );
    })
    .catch((err) => {
      console.error("There is an error getting data from db: " + err);
      res.status(400).send(err);
    });
};
exports.update1 = (req, res) => {
  id = req.body.id;
  title = req.body.title;
  description = req.body.description;
  price = req.body.price;
  quantity = req.body.quantity;
  img = req.body.img;
  name = req.body.name;

  Cart.update(
    {
      id: id,
      title: title,
      description: description,
      price: price,
      quantity: quantity - 1,
      img: img,
      name: name,
    },
    { where: { id: id, name: name } }
  )
    .then((data) => {
      Cart.findAll({ where: { name: name, id: id }, raw: true }).then(
        (data) => {
          res.send(data);
        }
      );
    })
    .catch((err) => {
      console.error("There is an error getting data from db: " + err);
      res.status(400).send(err);
    });
};

exports.delete = (req, res) => {
  var id = req.params.id;
  Cart.destroy({ where: { id: id } })
    .then((data) => {
      console.log(data);
      var strMsg = "Record deleted successfully";
      res.status(200).send(strMsg);
    })
    .catch((err) => {
      console.log("there is an error" + err);
      err.status(400).send(err);
    });
};
exports.deleteAll = (req, res) => {
  Cart.destroy({ where: {}, truncate: false })
    .then((data) => {
      console.log(data);
      var strMsg = "Record deleted successfully";
      res.status(200).send(strMsg);
    })
    .catch((err) => {
      console.log("there is an error" + err);
      err.status(400).send(err);
    });
};

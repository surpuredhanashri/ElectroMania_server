const db = require("../models");
const Product = db.productTable;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
  const product = {
    productid: req.body.productid,
    productitle: req.body.productitle,
    productdescription: req.body.productdescription,
    productprice: req.body.productprice,
    productbrand: req.body.productbrand,
    productrating: req.body.productrating,
    productimageid: req.body.productimageid,
    productsize: req.body.productsize,
    productquantity: req.body.productquantity,
    productcateogry: req.body.productcateogry,
    productimg: req.body.productimg
  };
 Product.create(product)
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
  console.log("Get All Products")
  Product.findAll().then(data => {
    console.log(data);
    res.send(data)
  }).catch(err => {
    console.error("There is an error getting data from db: " + err);
    res.send(err);
  })
  
};
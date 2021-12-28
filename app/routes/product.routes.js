module.exports = (app) => {
    const products = require("../controllers/product.controller");
    var router = require("express").Router();
    router.post("/", products.create);
    router.get("/getAllproducts",products.findAll);
    app.use("/products", router);
  };

 
  /*
    {
    "productid": 1,
    "productitle": "Iphone",
    "productdescription": "Iphone is good",
    "productprice": 27480,
    "productbrand": "Apple",
    "productrating": 4,
    "productimageid": "1",
    "productsize": "L",
    "productquantity": 1,
    "productcateogry": "Mobile",
    "productimg": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1631652956000"
}
*/
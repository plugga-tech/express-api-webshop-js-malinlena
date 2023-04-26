var express = require("express");
var ObjectId = require("mongodb").ObjectId;
var router = express.Router();

// SKAPA ORDER FÖR EN SPECIFIK USER
router.post("/add", function (req, res) {
  const userId = req.body.user;
  const products = req.body.products;

  req.app.locals.db
    .collection("orders")
    .insertOne({
      user: userId,
      products,
    })
    .then((result) => {
      console.log("res", result);
      res.json(result);
    });

  products.forEach((product) => {
    console.log(product);
    req.app.locals.db
      .collection("products")
      .updateOne(
        { productId: new ObjectId(product.productId) },
        { $inc: { lager: -product.quantity } }
      );
  });
});

// HÄMTA ALLA ORDERS
router.get("/all", function (req, res) {
  req.app.locals.db
    .collection("orders")
    .find()
    .toArray()
    .then((results) => {
      res.json(results);
    });
});

module.exports = router;

var express = require("express");
var ObjectId = require("mongodb").ObjectId;
var router = express.Router();

// HÄMTA ALLA PRODUKTER
router.get("/", function (req, res) {
  req.app.locals.db
    .collection("products")
    .find()
    .toArray()
    .then((results) => {
      res.json(results);
    });
});

// HÄMTA SPECIFIK PRODUKT
router.get("/:productId", function (req, res) {
  const productId = new ObjectId(req.params.productId);

  req.app.locals.db
    .collection("products")
    .find({ _id: productId })
    .toArray()
    .then((results) => {
      const result = results[0];
      res.json(result);
    });
});

// SKAPA PRODUKT
router.post("/add", function (req, res) {
  req.app.locals.db
    .collection("products")
    .insertOne(req.body)
    .then((result) => {
      res.json({
        status: "success",
        data: result,
      });
    });
});

module.exports = router;

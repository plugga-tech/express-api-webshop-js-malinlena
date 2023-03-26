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
      let printProducts = "<div><h2>Våra produkter</h2>";

      for (product in results) {
        const {
          _id: id,
          name,
          description,
          price,
          lager,
        } = results[product] ?? {};
        printProducts += `<div>Produkt: ${id} ${name} ${description} ${price} ${lager} </div>`;
      }

      printProducts += "</div>";

      res.send(printProducts);
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
      const { _id: id, name, description, price, lager } = result ?? {};
      let printProduct = `<div><h2>${name}</h2>`;

      printProduct += `<div> ${id} ${name} ${description} ${price} ${lager} </div>`;

      printProduct += "</div>";

      res.send(printProduct);
    });
});

// SKAPA PRODUKT
router.post("/add", function (req, res) {
  req.app.locals.db
    .collection("products")
    .insertOne(req.body)
    .then((result) => {
      res.redirect("/show");
    });
});

module.exports = router;

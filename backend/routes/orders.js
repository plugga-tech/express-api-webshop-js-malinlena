var express = require("express");
var ObjectId = require("mongodb").ObjectId;
var router = express.Router();

// SKAPA ORDER FÖR EN SPECIFIK USER

router.post("/add/:userId", function (req, res) {
  const userId = new ObjectId(req.params.userId);
  req.app.locals.db
    .collection("orders")
    .insertOne({
      user: userId,
      products: req.body.products,
    })
    .then((result) => {
      res.redirect("/show");
    });
});

// HÄMTA ALLA ORDERS

router.get("/all", function (req, res) {
  req.app.locals.db
    .collection("orders")
    .find()
    .toArray()
    .then((results) => {
      console.log(results);

      const tab = "&emsp;";
      let printOrders = "<div><h2>Alla ordrar</h2>";

      for (order in results) {
        const { _id: id, user, products } = results[order] ?? {};

        let printProducts = "";

        products.forEach((product, index) => {
          const { productId, quantity } = product;
          printProducts += `<div>${tab}${tab}Product #${index + 1}:</div>`;
          printProducts += `<div>${tab}${tab}${tab}Product ID: ${productId}</div>`;
          printProducts += `<div>${tab}${tab}${tab}Quantity: ${quantity}</div>`;
        });

        printOrders += `<h3>Order ID:${id}</h3>`;
        printOrders += `<div>${tab}User ID: ${user}</div>`;
        printOrders += `<div>${tab}Products: ${printProducts}</div>`;
      }

      printOrders += "</div>";

      res.send(printOrders);
    });
});

module.exports = router;

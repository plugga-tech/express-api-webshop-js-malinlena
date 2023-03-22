var express = require("express");
// const { ObjectId } = require("mongodb");
var ObjectId = require("mongodb").ObjectId;
var router = express.Router();

// GET users listing
router.get("/", function (req, res, next) {
  req.app.locals.db
    .collection("users")
    .find()
    .toArray()
    .then((results) => {
      console.log(results);

      let printUsers = "<div><h2>Våra users</h2>";

      for (user in results) {
        const { _id: id, name, email } = results[user] ?? {};
        printUsers += `<div> ${id} ${name} ${email} </div>`;
      }

      printUsers += "</div>";

      res.send(printUsers);
    });
});

router.get("/:userId", function (req, res) {
  const userId = new ObjectId(req.params.userId);

  req.app.locals.db
    .collection("users")
    .find({ _id: userId })
    .toArray()
    .then((results) => {
      const result = results[0];

      let printUser = "<div><h2>Vår user</h2>";

      const { _id: id, name, email } = result ?? {};
      printUser += `<div> ${id} ${name} ${email} </div>`;

      printUser += "</div>";

      res.send(printUser);
    });
});

router.post("/add", function (req, res) {
  req.app.locals.db
    .collection("users")
    .insertOne(req.body)
    .then((result) => {
      console.log(result);
      res.redirect("/show");
    });
});

module.exports = router;

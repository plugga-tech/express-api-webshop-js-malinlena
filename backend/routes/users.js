var express = require("express");
// const { ObjectId } = require("mongodb");
var ObjectId = require("mongodb").ObjectId;
var router = express.Router();

// Hämta alla users
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

// Hämta specifik user
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

// Skapa user
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

// LOGGA IN USER
router.post("/login", function (req, res) {
  const { email, password } = req.body;
  req.app.locals.db
    .collection("users")
    .find({ email })
    .toArray()
    .then((results) => {
      const result = results[0];
      if (password === result.password) {
        console.log("Du är inloggad");
      } else {
        console.log("Inkorrekt lösenord");
      }
    })
    .catch(() => {
      console.log("Fel email");
    });
});

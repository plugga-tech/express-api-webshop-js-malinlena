var express = require("express");
var ObjectId = require("mongodb").ObjectId;
var router = express.Router();

// Hämta alla users
router.get("/", function (req, res, next) {
  req.app.locals.db
    .collection("users")
    .find()
    .toArray()
    .then((results) => {
      res.json(results);
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
      res.json(result);
    });
});

// Skapa user
router.post("/add", function (req, res) {
  req.app.locals.db
    .collection("users")
    .insertOne(req.body)
    .then((result) => {
      res.json({
        status: "success",
        data: result,
      });
    });
});

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
        res.json({
          status: "success",
          data: result,
        });
      } else {
        console.log("Inkorrekt lösenord");
        res.json({
          error: { code: 401, message: "Inkorrekt lösenord" },
        });
      }
    })
    .catch(() => {
      console.log("Fel email");
      res.json({
        error: { code: 401, message: "Fel email" },
      });
    });
});

module.exports = router;

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const controller = require("../controllers/auth.controller");

router.post("/register", controller.register);
router.post("/login", controller.login);

router.get("/protected", authMiddleware, (req, res) => {
  //esta es una ruta que necesita autorizacion
  res.status(200).send(`Hola User ${req.userId}`);
});

module.exports = router;

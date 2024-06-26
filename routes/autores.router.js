console.log("rutas de autores");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const controller = require("../controllers/autores.controller");

// Prefijo: /autores

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", controller.store);
router.put("/:id", controller.update);
router.delete("/:id", controller.destroy);

module.exports = router;

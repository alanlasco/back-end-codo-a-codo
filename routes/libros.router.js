console.log("rutas de libros");

const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const controller = require("../controllers/libros.controller");

// Prefijo: /libros

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", upload.single("imagen"), controller.store);
router.put("/:id", controller.update);
router.delete("/:id", controller.destroy);

module.exports = router;
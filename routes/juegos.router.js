const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const controller = require("../controllers/juegos.controller");

// Prefijo: /juegos

router.get("/", controller.index);
router.get("/:id", controller.show);
router.put("/:id", upload.single("imagen"), controller.update);
router.post("/", upload.single("imagen"), controller.store);
router.delete("/:id", controller.destroy);

module.exports = router;

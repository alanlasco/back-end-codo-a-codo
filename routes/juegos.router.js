const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/auth.middleware");
const controller = require("../controllers/juegos.controller");

// Prefijo: /juegos

router.get("/", controller.index);
router.get("/:id", controller.show);
router.put("/:id", authMiddleware, upload.single("imagen"), controller.update);
router.post("/", upload.single("imagen"), controller.store);
router.delete("/:id", controller.destroy);

module.exports = router;

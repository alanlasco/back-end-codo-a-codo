const express = require("express");
const router = express.Router();
const axios = require("axios");
const controller = require("../controllers/plataforma.controller");


router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", controller.store);
router.put("/:id", controller.update);
router.delete("/:id", controller.destroy);

// Preguntar por la api de ubisoft
//router.get("/:id/ubisoft", async (req, res) => {
    //const { id } = req.params;
    //try {
        //const response = await axios.get(`https://api.ubisoft.com/games/${id}`);
        //res.json(response.data);
    //} catch (error) {
        //res.status(500).json({ error: "Error al conectar con Ubisoft" });
    //}
//});

module.exports = router;

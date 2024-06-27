const express = require("express");
const router = express.Router();
const app = express();
require("dotenv").config();
app.use(express.static("public"));

app.use(express.json());
app.use("/juegos", require("./routes/juegos.router"));

const PORT = 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

module.exports = router;

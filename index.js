const express = require("express");
const router = express.Router();
const app = express();
app.use(express.static("public"));

app.use(express.json());
app.use("/juegos", require("./routes/juegos.router"));

//te agregue la ruta de autores
app.use("/autores", require("./routes/autores.router"));

const PORT = 3306;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

module.exports = router;

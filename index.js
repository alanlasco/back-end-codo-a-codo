const express = require("express");
const router = express.Router();
const app = express();
require("dotenv").config();
app.use(express.static("public"));

const cors = require("cors");

// Habilitar CORS para todas las rutas
app.use(cors());

app.use(express.json());

//te agregue la ruta de autores
app.use("/plataformas", require("./routes/plataformas.router"));
app.use("/autores", require("./routes/autores.router"));
app.use("/juegos", require("./routes/juegos.router"));
app.use("/libros", require("./routes/libros.router"));
app.use("/auth", require("./routes/auth.router"));

const PORT = 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

module.exports = router;

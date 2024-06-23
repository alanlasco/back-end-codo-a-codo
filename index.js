const express = require("express");
const router = express.Router();
const app = express();
app.use(express.static("public"));

app.use(express.json());
app.use("/juegos", require("./routes/juegos.router"));
app.use("/libros", require("./routes/libros.router"));

const PORT = 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

module.exports = router;

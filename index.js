const express = require("express");
const router = express.Router();

app.use(express.static("public"));

app.use(express.json());

// const PORT = 3000;

// app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

module.exports = router;

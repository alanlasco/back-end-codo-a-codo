console.log("controlador de autores");
const db = require("../db/db");
const fs = require("fs");
const path = require("path");

const index = (req, res) => {
  const sql = "SELECT * FROM autores";
  db.query(sql, (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }
    res.json(rows);
  });
};

const show = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM autores WHERE id_autores = ?";
  db.query(sql, [id], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (rows.length == 0) {
      return res.status(404).send({ error: "No existe el autor" });
    }

    res.json(rows[0]);
  });
};

const store = (req, res) => {
  console.log(req.file);

  if (req.file) {
    imageName = req.file.filename;
  }
  const { nombre } = req.body;

  const sql = "INSERT INTO autores (nombre_autor) VALUES (?)";
  db.query(sql, [nombre], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    const autor = { ...req.body, id: result.insertId };

    res.status(201).json(autor);
  });
};

const update = (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  const sql = "UPDATE autores SET nombre_autor = ? WHERE id_autores = ?";
  db.query(sql, [nombre, id], (error, result) => {
    console.log(result);
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (result.affectedRows == 0) {
      return res.status(404).send({ error: "No existe el autor" });
    }

    const autor = { ...req.body, ...req.params };

    res.json(autor);
  });
};

const destroy = (req, res) => {
  const { id } = req.params;

  let sql = "SELECT * FROM autores WHERE id_autores = ?";
  db.query(sql, [id], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (rows.length == 0) {
      return res.status(404).send({ error: "No existe el autor" });
    }

    fs.unlinkSync(path.resolve(__dirname, "../public/uploads", rows[0].imagen));
  });

  sql = "DELETE FROM autores WHERE id_autores = ?";
  db.query(sql, [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (result.affectedRows == 0) {
      return res.status(404).send({ error: "No existe el autor" });
    }

    res.json({ mensaje: "Autor eliminado" });
  });
};

module.exports = {
  index,
  show,
  update,
  store,
  destroy,
};

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
  const { nombreAutor } = req.body;

  const sql = "INSERT INTO autores (nombre_autor) VALUES (?)";
  db.query(sql, [nombreAutor], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    const autor = { ...req.body, id: result.insertId };

    res.status(201).json(autor);
  });
};

const update = (req, res) => {
  const { id } = req.params;
  const { nombreAutor } = req.body;

  const sql = "UPDATE autores SET nombre_autor = ? WHERE id_autores = ?";
  db.query(sql, [nombreAutor, id], (error, result) => {
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
  console.log(id);
  sql = "DELETE FROM `autores` WHERE autores.id_autores = ?";
  db.query(sql, [id], (error, result) => {
    if (error) {
      return res.status(500).json({
        error:
          "Posiblemente este intentando borrar un autor que esta siendo utilizado por un registro, intente más tarde",
      });
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

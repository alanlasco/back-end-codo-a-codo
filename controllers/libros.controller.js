console.log("controlador de libros");

const db = require("../db/db");
const fs = require("fs");
const path = require("path");

const index = (req, res) => {
  const sql =
    "SELECT l.id_libros, l.nombre_libro, l.anio_libro, l.imagen_libro, l.autores_id, FROM libros AS l INNER JOIN autores AS a ON l.autores_id = a.id_autores";
  db.query(sql, (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }
    res.json(rows);
  });
};
const show = (req, res) => {
  const { id } = req.params;

  const sql =
    "SELECT l.id_libros, l.nombre_libro, l.anio_libro, l.imagen_libro, l.autores_id, FROM libros AS l INNER JOIN autores AS a ON l.autores_id = a.id_autores WHERE l.id_libros = ?";
  db.query(sql, [id], (error, rows) => {
    // console.log(rows);
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (rows.length == 0) {
      return res.status(404).send({ error: "No existe el libro" });
    }

    res.json(rows[0]);
  });
};

const destroy = (req, res) => {
  const { id } = req.params;
  //selecciono el registro con id que tiene la imagen a borrar
  let sqlImg = "SELECT * FROM libros WHERE id_libros = ?";
  db.query(sqlImg, [id], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (rows.length == 0) {
      return res.status(404).send({ error: "No existe el libro" });
    }
    //borro la imagen
    fs.unlinkSync(
      path.resolve(__dirname, "../public/uploads", rows[0].imagen_libro)
    );
  });

  //borro el registro de la base de datos
  sql = "DELETE FROM libros WHERE id_libros = ?";
  db.query(sql, [id], (error, result) => {
    console.log(error);
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (result.affectedRows == 0) {
      return res.status(404).send({ error: "No existe el libro" });
    }

    res.json({ mensaje: "Libro eliminado" });
  });
};

module.exports = {
  index,
  show,
  store,
  destroy,
};
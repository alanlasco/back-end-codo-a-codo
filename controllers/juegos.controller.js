const db = require("../db/db");
const fs = require("fs");
const path = require("path");

const index = (req, res) => {
  const sql =
    "SELECT j.id_juegos, j.nombre_juego, j.imagen_juego, j.url_juego, j.plataformas_id, p.plataforma FROM juegos AS j INNER JOIN plataformas AS p ON j.plataformas_id = p.id_plataformas";
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
    "SELECT j.id_juegos, j.nombre_juego, j.imagen_juego, url_juego, j.plataformas_id, p.plataforma FROM juegos AS j INNER JOIN plataformas AS p ON j.plataformas_id = p.id_plataformas WHERE j.id_juegos = ?";
  db.query(sql, [id], (error, rows) => {
    // console.log(rows);
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (rows.length == 0) {
      return res.status(404).send({ error: "No existe el juego" });
    }

    res.json(rows[0]);
  });
};

const destroy = (req, res) => {
  const { id } = req.params;
  //selecciono el registro con id que tiene la imagen a borrar
  let sqlImg = "SELECT * FROM juegos WHERE id_juegos = ?";
  db.query(sqlImg, [id], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (rows.length == 0) {
      return res.status(404).send({ error: "No existe el producto" });
    }
    //borro la imagen
    fs.unlinkSync(
      path.resolve(__dirname, "../public/uploads", rows[0].imagen_juego)
    );
  });

  //borro el registro de la base de datos
  sql = "DELETE FROM juegos WHERE id_juegos = ?";
  db.query(sql, [id], (error, result) => {
    console.log(error);
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (result.affectedRows == 0) {
      return res.status(404).send({ error: "No existe el juego" });
    }

    res.json({ mensaje: "Juego eliminado" });
  });
};

module.exports = {
  index,
  show,
  store,
  destroy,
};

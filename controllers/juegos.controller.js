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

const update = (req, res) => {
  const { id } = req.params;
  const { nombreJuego, urlJuego, imageName, plataforma } = req.body; // Eliminado imagenJuego ya que no se usa
  console.log(nombreJuego, urlJuego, plataforma);
  // Asegúrate que plataforma no es undefined y trim seguro
  const plataformaTrimmed = (plataforma || "").trim();

  if (!plataformaTrimmed) {
    return res.status(400).send({ error: "La plataforma es requerida" });
  }

  const sqlJuego = `
    SELECT j.id_juegos, j.nombre_juego, j.imagen_juego, url_juego, j.plataformas_id, p.plataforma
    FROM juegos AS j
    INNER JOIN plataformas AS p ON j.plataformas_id = p.id_plataformas
    WHERE j.id_juegos = ?
  `;

  db.query(sqlJuego, [id], (error, rowsJuego) => {
    if (error) {
      return res.status(500).json({ error: "Intente más tarde" });
    }
    if (rowsJuego.length === 0) {
      return res.status(404).send({ error: "No existe el juego" });
    }
    let imageName = rowsJuego[0].imagen_juego; // imagen por defecto
    console.log(imageName);
    const filePath = path.resolve(
      __dirname,
      "../public/uploads",
      rowsJuego[0].imagen_juego
    ); // ruta del archivo
    console.log(filePath);
    if (req.file) {
      imageName = req.file.filename;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Archivo ${filePath} eliminado correctamente.`);
      } else {
        console.log(`El archivo ${filePath} no existe.`);
      }
    }

    const sqlPlataforma =
      "SELECT * FROM `plataformas` WHERE `plataforma` LIKE ?";
    db.query(sqlPlataforma, [plataformaTrimmed], (error, rows) => {
      if (error) {
        return res.status(500).json({ error: "Intente más tarde" });
      }

      if (rows.length === 0) {
        return res.status(404).send({ error: "No existe la plataforma" });
      }

      const plataformaId = rows[0].id_plataformas;

      const sqlUpdate = `
        UPDATE juegos SET nombre_juego = ?, url_juego = ?, imagen_juego = ?, plataformas_id = ?
        WHERE id_juegos = ?
      `;

      db.query(
        sqlUpdate,
        [nombreJuego, urlJuego, imageName, plataformaId, id],
        (error2, result2) => {
          if (error2) {
            return res.status(500).json({
              error: "Intente más tarde, no se pudo actualizar el juego",
            });
          }

          if (result2.affectedRows === 0) {
            return res.status(404).send({ error: "No existe el juego" });
          }

          const juegoActualizado = {
            id,
            nombreJuego,
            urlJuego,
            imagen_juego: imageName,
            plataformas_id: plataformaId,
          };

          res
            .status(200)
            .json({ juego: juegoActualizado, plataforma: plataformaTrimmed });
        }
      );
    });
  });
};

const store = (req, res) => {
  const { plataforma, nombreJuego, urlJuego } = req.body;

  const sql1 = "SELECT * FROM `plataformas` WHERE `plataforma` LIKE ?";
  db.query(sql1, [plataforma.trim()], (error, rows) => {
    // console.log(rows);
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (rows.length == 0) {
      fs.unlinkSync(
        path.resolve(__dirname, "../public/uploads", req.file.filename)
      );
      return res.status(404).send({ error: "No existe la plataforma" });
    }
    let imageName = "";
    if (req.file) {
      imageName = req.file.filename;
    }

    console.log(rows);
    const plataformaId = rows[0].id_plataformas; // Obtener el id de la plataforma insertada
    console.log(plataformaId);

    const sql2 =
      "INSERT INTO juegos (nombre_juego, imagen_juego, url_juego, plataformas_id) VALUES (?, ?, ?, ?)";
    console.log(nombreJuego, imageName, urlJuego, plataformaId);
    db.query(
      sql2,
      [nombreJuego, imageName, urlJuego, plataformaId],
      (error2, result2) => {
        if (error2) {
          return res.status(500).json({
            error: error2 + "Intente mas tarde, no se pudo agregar juegos",
          });
        }

        // Solo enviamos la respuesta después de que ambas inserciones sean exitosas
        const juego = {
          id: result2.insertId,
          nombreJuego,
          imageName,
          urlJuego,
          plataformas_id: plataformaId,
        };
        const plataformaObj = { id: plataformaId, plataforma: plataforma };

        res.status(201).json({ juego, plataformaObj });
      }
    );
  });
};

const destroy = (req, res) => {
  const { id } = req.params;

  let sqlImg = "SELECT * FROM juegos WHERE id_juegos = ?";
  db.query(sqlImg, [id], (error, rows) => {
    // console.log(rows);
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (rows.length == 0) {
      return res.status(404).send({ error: "No existe el juego" });
    }

    fs.unlinkSync(
      path.resolve(__dirname, "../public/uploads", rows[0].imagen_juego)
    );
  });
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
  update,
  destroy,
};

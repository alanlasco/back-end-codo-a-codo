console.log("controlador de libros");

const db = require("../db/db");
const fs = require("fs");
const path = require("path");

const index = (req, res) => {
  const sql = `SELECT l.id_libros, l.nombre_libro, l.anio_libro, l.imagen_libro, a.nombre_autor FROM libros AS l INNER JOIN autores AS a ON l.autores_id = a.id_autores`;
  db.query(sql, (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "Intente más tarde" });
    }
    res.json(rows);
  });
};

const show = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT l.id_libros, l.nombre_libro, l.anio_libro, l.imagen_libro, a.nombre_autor 
    FROM libros AS l 
    INNER JOIN autores AS a ON l.autores_id = a.id_autores 
    WHERE l.id_libros = ?`;
  db.query(sql, [id], (error, rows) => {
    // console.log(rows);
    if (error) {
      return res.status(500).json({ error: "Intente más tarde" });
    }

    if (rows.length == 0) {
      return res.status(404).send({ error: "No existe el libro" });
    }

    res.json(rows[0]);
  });
};

const update = (req, res) => {
  const { id } = req.params;
  const { autorLibro, nombreLibro, anioLibro } = req.body;

  console.log(nombreLibro, anioLibro, autorLibro);
  const autoresTrimmed = (autorLibro || "").trim();

  if (!autoresTrimmed) {
    return res.status(400).send({ error: "El autor es requerido" });
  }

  const sqlLibros = `
SELECT l.id_libros, l.nombre_libro, l.anio_libro, l.imagen_libro, l.autores_id, a.nombre_autor FROM libros AS l INNER JOIN autores AS a ON l.autores_id = a.id_autores WHERE l.id_libros = ?;
  `;

  db.query(sqlLibros, [id], (error, rowsLibros) => {
    if (error) {
      return res.status(500).json({ error: "Intente más tarde" });
    }
    if (rowsLibros.length === 0) {
      return res.status(404).send({ error: "No existe el libro" });
    }

    let imageName = rowsLibros[0].imagen_libro;
    const filePath = path.resolve(
      __dirname,
      "../public/uploads",
      rowsLibros[0].imagen_libro
    );

    if (req.file) {
      imageName = req.file.filename;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const sqlAutores = "SELECT * FROM `autores` WHERE `nombre_autor` LIKE ?";
    db.query(sqlAutores, [autoresTrimmed], (error, rows) => {
      if (error) {
        return res.status(500).json({ error: "Intente más tarde" });
      }

      if (rows.length === 0) {
        return res.status(404).send({ error: "No existe el autor" });
      }

      const autoresId = rows[0].id_autores;

      const sqlUpdate = `
        UPDATE libros SET nombre_libro = ?, anio_libro = ?, imagen_libro = ?, autores_id = ?
        WHERE id_libros = ?
      `;

      db.query(
        sqlUpdate,
        [nombreLibro, anioLibro, imageName, autoresId, id],
        (error2, result2) => {
          if (error2) {
            return res.status(500).json({
              error: "Intente más tarde, no se pudo actualizar el libro",
            });
          }

          if (result2.affectedRows === 0) {
            return res.status(404).send({ error: "No existe el libro" });
          }

          const libroActualizado = {
            id,
            nombreLibro,
            anioLibro,
            imagen_libro: imageName,
            autores_id: autoresId,
          };

          res
            .status(200)
            .json({ libro: libroActualizado, autor: autoresTrimmed });
        }
      );
    });
  });
};

const store = (req, res) => {
  const { autorLibro, nombreLibro, anioLibro } = req.body;

  const sql1 = "SELECT * FROM `autores` WHERE `nombre_autor` LIKE ?";
  db.query(sql1, [autorLibro.trim()], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "Intente más tarde" });
    }

    if (rows.length == 0) {
      fs.unlinkSync(
        path.resolve(__dirname, "../public/uploads", req.file.filename)
      );
      return res.status(404).send({ error: "No existe el autor" });
    }
    let imageName = "";
    if (req.file) {
      imageName = req.file.filename;
    }

    const autoresId = rows[0].id_autores;

    const sql2 =
      "INSERT INTO libros (nombre_libro, imagen_libro, anio_libro, autores_id) VALUES (?, ?, ?, ?)";
    db.query(
      sql2,
      [nombreLibro, imageName, anioLibro, autoresId],
      (error2, result2) => {
        if (error2) {
          return res.status(500).json({
            error: error2 + "Intente más tarde, no se pudo agregar libros",
          });
        }

        const libro = {
          id: result2.insertId,
          nombreLibro,
          imageName,
          anioLibro,
          autores_id: autoresId,
        };
        const autoresObj = { id: autoresId, autor: autorLibro };

        res.status(201).json({ libro, autoresObj });
      }
    );
  });
};
const destroy = (req, res) => {
  const { id } = req.params;

  const sqlImg = "SELECT * FROM libros WHERE id_libros = ?";
  db.query(sqlImg, [id], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (rows.length == 0) {
      return res.status(404).send({ error: "No existe el libro" });
    }

    fs.unlinkSync(
      path.resolve(__dirname, "../public/uploads", rows[0].imagen_libro)
    );

    const sql = "DELETE FROM libros WHERE id_libros = ?";
    db.query(sql, [id], (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Intente mas tarde" });
      }

      if (result.affectedRows == 0) {
        return res.status(404).send({ error: "No existe el libro" });
      }

      res.json({ mensaje: "Libro eliminado" });
    });
  });
};

module.exports = {
  index,
  show,
  update,
  store,
  destroy,
};

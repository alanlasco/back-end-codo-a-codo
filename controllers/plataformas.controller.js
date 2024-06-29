const db = require("../db/db");

const index = (req, res) => {
  const sql = "SELECT * FROM plataformas";
  db.query(sql, (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "Intente más tarde" });
    }
    res.json(rows);
  });
};

const show = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM plataformas WHERE id_plataformas = ?";
  db.query(sql, [id], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "Intente más tarde" });
    }
    if (rows.length === 0) {
      return res.status(404).send({ error: "No existe la plataforma" });
    }
    res.json(rows[0]);
  });
};

const store = (req, res) => {
  const { plataforma } = req.body;
  const sql = "INSERT INTO plataformas (plataforma) VALUES (?)";
  db.query(sql, [plataforma], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Intente más tarde" });
    }
    res.status(201).json({ id: result.insertId, plataforma });
  });
};

const update = (req, res) => {
  const { id } = req.params;
  const { plataforma } = req.body;
  const sql = "UPDATE plataformas SET plataforma = ? WHERE id_plataformas = ?";
  db.query(sql, [plataforma, id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Intente más tarde" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: "No existe la plataforma" });
    }
    res.status(200).json({ id, plataforma });
  });
};

const destroy = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM plataformas WHERE id_plataformas = ?";
  db.query(sql, [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Intente más tarde" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ error: "No existe la plataforma" });
    }
    res.json({ mensaje: "Plataforma eliminada" });
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};

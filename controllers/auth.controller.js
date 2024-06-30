const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db/db");

const register = (req, res) => {
  const { email, password } = req.body;

  const hash = bcrypt.hashSync(password, 8);
  console.log(hash);

  //   const user = { id: Date.now(), email, password: hash };
  const sql = "INSERT INTO `users` ( `email`, `password`) VALUES ( ?, ?)";
  db.query(sql, [email, hash], (error, rows) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }
    console.log(rows);
    const token = jwt.sign({ id: rows.insertId }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(201).send({ auth: true, token });
  });

  //   userModel.push(user);

  //   const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
  //     expiresIn: "1h",
  //   });
};

const login = (req, res) => {
  const { email, password } = req.body;

  //   const user = userModel.find((u) => u.email === email);
  const sql = "SELECT * FROM users where email = ?";
  db.query(sql, [email], (error, rows) => {
    // console.log(rows);
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    if (rows.length == 0) return res.status(404).send("User not found.");

    const passwordIsValid = bcrypt.compareSync(password, rows[0].password);
    //esto checkea mediante hash, si las contraseñas coinciden
    //el hash tiene informacion de como formar el mismo hash

    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    const token = jwt.sign({ id: rows.insertId }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.send({ auth: true, token });
  });
};

module.exports = {
  register,
  login,
};

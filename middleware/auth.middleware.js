//para checkear que el usuario es quien dice ser
// checkea si el usuario tiene el token
// si no esta el token, no sirve
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"]; //token Bearer +token con get

  if (!authHeader)
    return res
      .status(403)
      .send({ auth: false, message: "No se proveyó un token" });

  const token = authHeader.split(" ")[1]; // esto porque viene bearer +token

  if (!token)
    return res.status(403).send({ auth: false, message: "Malformed token." });

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id; //el payload en este caso solo el id

    next();
  });
};

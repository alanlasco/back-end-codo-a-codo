console.log("controlador de autores");
const db = require("../db/db");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
      // console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      // console.log(file);
      const fileTypes = /jpg|jpeg|png/;
  
      const mimetype = fileTypes.test(file.mimetype);
  
      const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
  
      if (mimetype && extname) {
        return cb(null, true);
      }
  
      cb("Tipo de archivo no soportado");
    },
    limits: { fileSize: 1024 * 1024 * 1 }, // 1 Mb
  });
  
  const controller = require("../controllers/productos.controller");



module.exports = {
  index,
  show,
  store,
  destroy,
  
};

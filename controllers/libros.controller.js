console.log("controlador de libros");

const db = require("../db/db");
const fs = require("fs");
const path = require("path");
module.exports = {
  index,
  show,
  store,
  destroy,
};
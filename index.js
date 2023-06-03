const express = require("express");
const morgan = require("morgan");
const { create } = require("express-handlebars");
require("dotenv").config();
require("./database/db.js");
const flash = require("connect-flash")

//Inicilizaciones
const app = express();

//Configuraciones | Settings
app.use(flash());
const PORT = process.env.PORT || 4000;

const hbs = create({
  extname: ".hbs",
  partialsDir: ["views/components"],
});
app.engine("hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

//Middlewares
app.use(morgan("dev")); //muestra todas las peticiones hechas al server
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

//Rutas | Routes
app.use("/", require("./routes/home"));
app.use("/auth", require("./routes/auth"));

//Escuchando puerto servidor | Listening port server
app.listen(PORT, () => {
  console.log("Server on port http://localhost:" + PORT);
});

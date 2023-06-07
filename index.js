require("dotenv").config();
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const csrf = require("csurf");
const passport = require("passport");
const morgan = require("morgan");
const { create } = require("express-handlebars");
const User = require("./models/User");
require("./database/db.js");

//Inicilizaciones
const app = express();

//Middlewares
//Config para las sessiones
app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);

//Config para los mensajes fhash de las validaciones
app.use(flash());

// //Config para las sessiones activas
app.use(passport.initialize());
app.use(passport.session());

//Crea la sesion del usuario y con la fn collback le pasamos el ID y el UserName por req.user)
passport.serializeUser((user, done) =>
  done(null, { id: user._id, userName: user.userName })
);
//Mantiene la session de usuario activa
passport.deserializeUser(async (user, done) => {
  const userDB = await User.findById(user.id);
  return done(null, { id: userDB._id, userName: userDB.userName });
});


//Config motor plantillas engine
const hbs = create({
  extname: ".hbs",
  partialsDir: ["views/components"],
});
app.engine("hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

//muestra todas las peticiones http hechas al server
app.use(morgan("dev"));

//Config archivos estaticos
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

//Habilita proteccion en los form
app.use(csrf());

//Config csrf manda el csrfToken al render de las vistas
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken(); //render csrfToken en views
  res.locals.mensajes = req.flash('mensajes'); //render msg en views
  next();
})

//Rutas | Routes
app.use("/", require("./routes/home"));
app.use("/auth", require("./routes/auth"));

//Config puerto
const PORT = process.env.PORT || 4000;
//Escuchando puerto servidor | Listening port server
app.listen(PORT, () => {
  // console.log("Server on port http://localhost:" + PORT);
  console.log(`Server running on port [http://localhost:${PORT}]`);
});

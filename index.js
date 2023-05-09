const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
require('./database/db.js')

//Inicilizaciones
const app = express();

//Configuraciones | Settings
const PORT = process.env.PORT || 4000

//Middlewares
app.use(morgan('dev')) //muestra todas las peticiones hechas al server

//Rutas | Routes
app.use("/", require('./routes/home'));

//Iniciar el servidor | Start the server
app.listen(PORT, () => {
    console.log("Server on port http://localhost:" + PORT);
})
const express = require('express')
const morgan = require('morgan')
require('dotenv').config()

//Inicilizaciones
const app = express();

//Configuraciones | Settings
const PORT = process.env.PORT || 4000

//Middlewares
app.use(morgan('dev'))

//Rutas | Routes

//Iniciar el servidor | Start the server
app.listen(PORT, () => {
    console.log("Server on port http://localhost:" + PORT);
})
const express = require('express')
const morgan = require('morgan')
const { create } = require('express-handlebars');
require('dotenv').config()
require('./database/db.js')

//Inicilizaciones
const app = express();

//Configuraciones | Settings
const PORT = process.env.PORT || 4000
const hbs = create({
    extname: '.hbs',
    partialsDir: ['views/components']
})
app.engine('hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', './views');

//Middlewares
app.use(morgan('dev')) //muestra todas las peticiones hechas al server
app.use(express.static(__dirname + 'public'));
app.use(express.urlencoded({ extended: true }));


//Rutas | Routes
app.use("/", require('./routes/home'));

//Iniciar el servidor | Start the server
app.listen(PORT, () => {
    console.log("Server on port http://localhost:" + PORT);
})
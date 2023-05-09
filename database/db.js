const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('DB conectada 🔥🔥'))
    .catch(e => console.log('Falló la conexion' + e))
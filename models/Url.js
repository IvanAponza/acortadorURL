const mongoose = require('mongoose')

const {Schema} = mongoose;

//Schema de los datos del documento
const urlSchema = new Schema({
    origin: {type: 'string', unique: true, required: true},
    shortUrl: {type: 'string', unique: true, required: true}
})

//modelo de coleccion de los documentos
const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
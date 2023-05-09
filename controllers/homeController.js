const { nanoid } = require('nanoid');
const Url = require('../models/Url.js');

//Mostrar URLs
const mostrarUrls = async (req, res) =>{
    try {
        const urls = await Url.find().lean()
        res.render('home', {urls: urls})
    } catch (error) {
        console.log(error);
        res.send('Algo falló...');
    }
}
//Crear URLs
const agregarUrl = async (req, res) =>{
    
    const {origin} = req.body

    try {
        const url = new Url({origin, shortUrl: nanoid(6)});
    } catch (error) {
        console.log(error);
        res.send('Algo falló...');
    }
}

//Editar URLs

//Eliminar URLs

module.exports = {
    mostrarUrls,
    agregarUrl
}
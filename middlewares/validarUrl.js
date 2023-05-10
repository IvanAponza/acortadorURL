const { URL } = require('url');

const validarUrl = (req, res, next)=>{
    try {
        const {origin} = req.body;
        const urlFrontend = new URL(origin);
        if(urlFrontend.origin !== 'null'){
            if(urlFrontend.protocol === 'http:' || urlFrontend.protocol === 'https:'){
                return next()
            }
            throw new Error('Debe tener https://')
        }
        throw new Error('url no valida')
    } catch (error) {
        console.log(error)
        return res.redirect('/')        
    }
}

module.exports = validarUrl;
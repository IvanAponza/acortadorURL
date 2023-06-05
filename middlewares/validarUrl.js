const { URL } = require('url');

const validarUrl = (req, res, next)=>{
    try {
        const {origin} = req.body;
        const urlFron = new URL(origin);
        if(urlFron.origin !== 'null'){
            if(urlFron.protocol === 'http:' || urlFron.protocol === 'https:'){
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
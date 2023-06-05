module.exports = (req, res, next) => {
    //req.isAuthenticated viene de passport
    if (req.isAuthenticated()) {
        return next();
    }
    //en caso de q no tenga una session activa 
    res.redirect('/auth/login');
};
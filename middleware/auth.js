function auth(req,res,next){
    var authToken = req.headers['authorization']
    next()
}

module.exports = auth
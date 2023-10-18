const jwt = require('jsonwebtoken')
const jwtSecret = "phpemuitoantigo"
function auth(req, res, next) {
    const authToken = req.headers['authorization'];
    
    if (authToken != undefined) {
        const bearer = authToken.split(' ');
        var token = bearer[1];
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.status(401).json({ error: 'Token inválido' });
            } else {
                console.log(data);
                next();
            }
        });
    } else {
        res.status(401).json({ error: 'Token ausente' });
    }
}

module.exports = auth
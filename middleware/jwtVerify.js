const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        return next();
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) {
            return res.status(401).send("Unauthorized");
        }

        jwt.verify(token, process.env.TOKEN_SECRET, {}, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(403).send("Invalid user");
            }
            req.user = user;
            next();
        });
    } catch (e) {
        next(e);
    }
};
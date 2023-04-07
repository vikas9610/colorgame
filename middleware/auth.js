const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {

    //const token = req.body.token || req.query.token || req.headers["authorization"];
    let token = req.session.token;

    if (!token) {
        return res.status(200).send({
            success: false,
            message: "No token provided!"
        });
    }

    try {

        const decode = jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized!"
                });
            }
            //req.userId = decoded.id;
        });

        
       return next();

    } catch (err) {
        return res.status(400).send({
            status: false,
            message: "Invalid token."
        });
    }

    return next();
}

module.exports = verifyToken;
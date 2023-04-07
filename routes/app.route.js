const AuthController = require("../controllers/auth.controller");

//middleware
const auth = require("./../middleware/auth");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Methods",
            "Origin, Content-Type, Accept,Authorization"
        );
        // res.header(
        //     "Access-Control-Allow-Headers",
        //     "Access-Control-Allow-Methods",
        //     "Access-Control-Allow-Origin",
        //     // "Access-Control-Allow",
        //     "Origin, Content-Type, Accept,Authorization"
        // );

        
       return next();
    });

    app.post("/api/auth/register", AuthController.register);
    app.post("/api/auth/login", AuthController.login);
    app.post("/api/update-password",auth,AuthController.updatePasword);
};
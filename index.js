const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const config = require("./config/auth.config");


const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "colorgame-session",
    secret: config.secret, // should use as secret environment variable
    httpOnly: true
  })
);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Color Game application." });
});

 const db = require("./models");
 db.sequelize.sync();

// routes
require('./routes/app.route')(app);

// set port, listen for requests
const PORT =8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// https.createServer(options,app).listen(8080, ()=>{
//     console.log('server is runing at port 8080')
//   });

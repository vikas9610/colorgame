module.exports = {
    HOST: "localhost", //"216.10.246.189",
    USER: "root", //"vrsof3ds_work",
    PASSWORD: "", //"vrsoft@2020",
    DB:  "colorgame", //"vrsof3ds_colorgame",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+05:30', // for writing to database
};
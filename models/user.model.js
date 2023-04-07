module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mobile: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.FLOAT
      },
      betting_status: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      referral_code: {
        type: Sequelize.STRING
      }
    },
    {
      underscored: true
    });
    return User;
  };
  
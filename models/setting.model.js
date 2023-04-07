module.exports = (sequelize, Sequelize) => {
    const Setting = sequelize.define("settings", {
      referral_from: {
        type: Sequelize.STRING
      },
      referral_to: {
        type: Sequelize.STRING
      },
      maintainance_status: {
        type: Sequelize.STRING
      },
      maintainance_message: {
        type: Sequelize.STRING
      },
      withdrawal_open_time: {
        type: Sequelize.TIME
      },
      withdrawal_close_time: {
        type: Sequelize.TIME
      },
      global_setting: {
        type: Sequelize.STRING
      }
    });
    return Setting;
  };
  
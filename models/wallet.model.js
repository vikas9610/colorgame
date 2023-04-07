module.exports = (sequelize, Sequelize) => {
    const Wallet = sequelize.define("wallet", {
        user_id: {
            type: Sequelize.STRING
        },
        operator: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        },
        txn_note: {
            type: Sequelize.TEXT('long')
        },
        date: {
            type: Sequelize.DATEONLY,
            defaultValue: Sequelize.NOW,
        },
        txn_id: {
            type: Sequelize.STRING
        }

    });
return Wallet;
};

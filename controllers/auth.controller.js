const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Setting = db.setting;
const Wallet = db.wallet;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const referralCode = require('referral-code-generator');

const createToken = async (id) => {
    try {

        return await jwt.sign({ id: id }, config.secret, {
            expiresIn: 86400 * 2, // 2 days
        });

    } catch (err) {
        return res.status(400).send({
            success: false,
            message: err.message
        });
    }
}

exports.register = async (req, res) => {

    try {
        // check user
        const userCheck = await User.findOne({
            where: {
                mobile: req.body.mobile
            }
        });
        if (userCheck) {
            return res.status(200).send({
                success: false,
                message: "Mobile Number is already in Registred."
            });
        }

        // setting data get
        const setting = await Setting.findOne();

        if (!req.body.referral_code) {
            var RefBonus = 0;
        } else {
            const referal = await User.findOne({
                where: {
                    referral_code: req.body.referral_code,
                },
            });

            if (!referal) {
                var RefBonus = 0;
                return res.status(404).send({
                    success: false,
                    message: "Invalid Referral Code."
                });
            } else {


                // update referral user balance
                const userBalanceUpdate = await User.update(
                    {
                        balance: referal.balance + setting.referral_from,
                    },
                    {
                        where: {
                            referral_code: req.body.referral_code,
                        }
                    }
                );

                if (userBalanceUpdate) {
                    const TXNID = referralCode.alphaNumeric('uppercase', 3, 4);

                    await Wallet.create({
                        user_id: referal.id,
                        operator: '+',
                        amount: setting.referral_from,
                        txn_note: "Referral Bonus",
                        txn_id: TXNID,
                    });
                }

                var RefBonus = setting.referral_to;
            }

        }

        // referral code genrate
        const referral = referralCode.alphaNumeric('uppercase', 2, 2);

        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            mobile: req.body.mobile,
            password: bcrypt.hashSync(req.body.password, 10),
            balance: RefBonus,
            betting_status: setting.global_setting,
            status: 1,
            referral_code: referral,
        });

        if (user) {
            const TXN = referralCode.alphaNumeric('uppercase', 3, 4);
            await Wallet.create({
                user_id: user.id,
                operator: '+',
                amount: RefBonus,
                txn_note: 'Referral Bonus',
                txn_id: TXN,
            });

            const token = await createToken(user.id);
            req.session.token = token;

            const userResult = {
                id: user.id,
                name: user.username,
                mobile: user.mobile,
                balance: user.balance,
                betting_status: user.betting_status,
                status: user.status,
                referral_code: user.referral_code,
                jwtToken: token,
            }

            return res.status(404).send({
                success: true,
                message: "User successfully registred.",
                data: userResult,
            });

        }

    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}

exports.login = async (req, res) => {

    try {
        const mobile = req.body.mobile;
        const password = req.body.password;

        const userData = await User.findOne({ mobile: mobile });

        if (userData) {
            const passMatch = await bcrypt.compare(password, userData.password);
            if (passMatch) {
                
                const token = await createToken(userData.id);
                req.session.token = token;
                
                const userResult = {
                    id: userData.id,
                    name: userData.username,
                    mobile: userData.mobile,
                    balance: userData.balance,
                    betting_status: userData.betting_status,
                    status: userData.status,
                    referral_code: userData.referral_code,
                    jwtToken: token,
                }

                return res.status(200).send({
                    success: true,
                    message: "Successfully login.",
                    data: userResult,
                });

            } else {
                return res.status(200).send({
                    success: false,
                    message: "Login details are incorrect."
                });
            }

        } else {
            return res.status(404).send({
                success: false,
                message: "User Not found."
            });
        }


    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}

exports.updatePasword = async (req, res,next) => {
    try {

        const user = await User.findOne({
            where: {
                id: req.body.user_id,
            },
        });

        const passwordIsValid = bcrypt.compareSync(
            req.body.oldPassword,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                success: false,
                message: "Old Password Was Wrong!",
            });
        }

        const updateUser = await User.update(
            {
                password: bcrypt.hashSync(req.body.password, 10)
            },
            {
                where: {
                    id: req.body.user_id,
                }
            }
        );

        if (updateUser) {
            res.status(200).send({
                success: true,
                message: "Password Changed Successfully!!",
            });
        } else {
            res.status(500).send({
                success: false,
                message: "Unable to change password!"
            });
        }

        next();
        
    } catch (error) {
        return res.status(400).send({
            status: false,
            message: err.message
        });
    }
}
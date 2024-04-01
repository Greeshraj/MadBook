const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require('dotenv').config();
module.exports = async (req, res, next) => {
    try {
        const mytoken = req.headers.authorization.split(" ")[1];
        const token = mytoken.replace(/^"(.*)"$/, '$1');
        const keys =  process.env.JWT_KEYS;
        const decoded = jwt.verify(token, keys);
        if (decoded) {
            req.user = await User.findOne({ email: decoded.email });
            next();
        } else {
            return res.status(407).json({
                message: "Unauthorised",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(412).json({
            message: "some error occured",
        });
    }
};

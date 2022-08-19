const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_TOKEN;

const varifyToken = async (req, res, next) => {
    const token = req.header("x-access-token") || req.body.token || req.query.token;
    
};

module.exports = varifyToken;

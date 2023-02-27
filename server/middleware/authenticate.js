const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = (req, res, next) => {
    const token = req.cookies.jwtoken;
    if (!token) {
      return res.redirect("/login");
    }
  
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = verified;
      next();
    } catch (err) {
      res.redirect("/login");
    }
  };

  module.exports = {
    authenticate
  };
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // Split using space and get the second part
    if (!token) {
      res.status(401);
      throw new Error("User Is Not Authorized Or Token Is Missing.");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECREATE, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401);
        throw new Error("User Is Not Authorized.");
      }
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401);
    throw new Error("User Is Not an Authorized.");
  }
});

module.exports = validateToken;

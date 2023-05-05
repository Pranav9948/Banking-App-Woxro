

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({
      message: "No authorization token provided",
      success: false,
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err,"abzx");
      return res.status(401).send({
        message: "Invalid authorization token",
        success: false,
      });
    } else {
      req.userId = decoded.id;
      next();
    }
  });
};

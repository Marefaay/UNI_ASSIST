const jwt = require("jsonwebtoken");
const userAutherization = async (request, response, next) => {
  const token = request.header("token");
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return response.json({ status: "Error", message: err });
    } else {
      if (!decoded.isAdmin && decoded.role == "student") {
        request.id = decoded.id;
        next();
      } else {
        return response.json({
          status: "Error",
          message: "You are No Allowed To Enter Here",
        });
      }
    }
  });
};
module.exports = userAutherization;

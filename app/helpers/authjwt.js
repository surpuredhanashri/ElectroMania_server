const expressJwt = require("express-jwt");

function jwt() {
  const secret = "secret";
  return expressJwt({ secret, algorithms: ["HS256"] }).unless({
    path: [
      // public routes that don't require authentication
      "/user/login",
      "/user/register",
      "/reset/sendmail",
      "/reset/verify",
      "/products/getAllproducts",
      "/user/sendmail",
      // "/"
    ],
  });
}

module.exports = jwt;

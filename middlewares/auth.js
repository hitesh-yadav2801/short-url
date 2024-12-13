const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) {
    return next();
  }
  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function(req, res, next){
    if(!req.user) return res.redirect("/login");

    if(!roles.includes(req.user.role)){
      return res.end('You are unauthorized');
    }
    next();
  }
}

// async function restrictToLoggedInUserOnly(req, res, next) {
//   const userId = req.headers["authorization"];
//   //const uid = req.cookies?.uid;
//   if (!uid) return res.redirect("/login");
//   const token = userId.split("Bearer ")[1];
//   const user = getUser(token);

//   console.log("this is user", user);

//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// }

// async function checkAuth(req, res, next) {
//   //const uid = req.cookies?.uid;
//   const userId = req.headers["authorization"];
//   const token = userId.split("Bearer ")[1];
//   if (!token) return res.status(401).json({ error: "Not authenticated" });

//   const user = getUser(token);

//   req.user = user;
//   next();
// }

module.exports = {
  checkForAuthentication,
  restrictTo
};

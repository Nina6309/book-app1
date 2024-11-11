const jwt = require("jsonwebtoken");
const user = require("../models/user");
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token =authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization  token is required' });
}
jwt.verify(token,"babarAB",(err,user)=>{
    if (err){
        res.status(401).json(err);

        
    }
    res.user =user;
    next();
});

};
module.exports = { authenticateToken };

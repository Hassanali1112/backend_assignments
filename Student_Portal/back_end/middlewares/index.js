const jwt = require("jsonwebtoken");
const User = require("../models/users.models");
require("dotenv").config();


// check validation of token 

const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = async (req, res, next) => {
  
  // console.log("cookie",req.headers.cookie)  
  // console.log("request", req.cookies.token);  
  

  try {

    const authorizedHeader = req.cookies.token
    // const authorizedHeader1 = req.headers.authorization;
  
    

    if(!authorizedHeader){
          return res.status(404).send({message: 'Unauthorized! Access Denied'})
    }
    

  const tokenVerified = jwt.verify(authorizedHeader, JWT_SECRET)



  const userFound = await User.findById(tokenVerified.userId).select("-password")
  

  if(!userFound){
    res.status(301).json({message : "User not found"})
  }

  req.user = userFound

  console.log(userFound)
  res.send({data : "data"})

    // next()

  } catch (error) {
    console.log("catch")
    res.status(301).json({message : "Invalid token"})
  }

}

module.exports = verifyToken
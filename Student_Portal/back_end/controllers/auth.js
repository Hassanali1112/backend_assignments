const bcrypt = require("bcrypt")
const { json } = require("stream/consumers");
const User  = require("../models/users.models.js");
require("dotenv").config()
const jwt = require("jsonwebtoken")


// token generation function 

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = async (userId) =>{
  
 return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "2d" })

}


// sign up function

const createNewUser = async (req, res) => {
  try {
 
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      return res.send("All fields are require!");
    }
    const passwordHashed = await bcrypt.hash(password, 12)
    console.log(passwordHashed);

    const user = await new User({name, email, password : passwordHashed})
    
    await user.save()

    res.status(201).json({message : "User has been created successfully", user})

    
  } catch (error) {
    console.log("error block")
    res.send({message : error})
  
}

}

// login function

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User with this email does not exist!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ message: "Incorrect Password!" });
    }

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Use true in production with HTTPS
      sameSite: "Lax", // For cross-origin requests (Frontend 5173, Backend 5000)
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });

   return res.status(200).json({
      success: true,
      message: "Login successfully",
      user:  user,
      token
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal server error" });
  }
};



// user validation

const getUser = (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized! No user found in request." });
    }

    res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    console.error("Error in getUser:", error.message);
    res.status(500).json({ message: "Something went wrong." });
  }
};


// logout function

const logout = async (req, res) => {
  console.log("check for logout")
//  return res.send("ok")
  try {
    
      res.clearCookie("token",{
        httpOnly : true,
        secure: process.env.NODE_ENV === "production",
        sameSite : "strict",
      })
    res.status(200).json({success : true, message : "logout successfully"})
  } catch (error) {
    res.status(500).json({success : false, message : "logout failure"})
  }

};

module.exports = { createNewUser, login, getUser, logout };

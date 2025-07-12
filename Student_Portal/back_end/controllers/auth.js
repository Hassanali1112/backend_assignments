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


  const user = await User.findOne({email})

 

  if(!user){
   return res.status(401).json({message : "User with this email not exists!"})
  }

  const checkPassword = await bcrypt.compare(password, user.password)

  if(!checkPassword){
    res.status(401).json({message : "Incorrecr Password!"})
  }
  console.log("done")
  const token = await generateToken(user._id)
  console.log(token)
  // res.cookie("token", token, {
  //   secure : true,
  //   maxAge : 2 * 24 * 60 * 60 * 1000,
  // })

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true in production with HTTPS
    sameSite: "lax",
    maxAge: 2 *24 * 60 * 60 * 1000,
  });

  console.log("check after token");

  res.status(201).json({
    success: true,
    message: "Login successfully",
        user: { userId: user._id, username: user.name, email: user.email },
    token: token,
  });

  } catch (error) {
    res.status(500).json({message : error})
  }

};

// user validation

const getUser = async (req, res) => {
  try {
    const data = req.user;
  // console.log("req.user",data)
  res.status(201).json({ success: true, data: "success" });
   
  //  res.status(201).json({ success: true, data : data });
    
  } catch (error) {
    console.log("catch errorrrr")
  }

};

// logout function

const logout = async (req, res) => {
  
  let userIndex = null

  const { id } = req.body;

  if (!id) {
    res.status(404).json({ message: new Error() });
  }

  try {
    const users = await readData();

    if (!users.length) {
      return res.status(404).json({ message: "users not found" });
    }

    const user = users.find((userObj, index) => {
      if (userObj.id === id) {
        userIndex = index;
        console.log(userIndex)
        return true;
      }
      return false;
    });

    console.log(user);

    // console.log(user)
    
    if (Object.keys(user).length !== 0) {
      if ("jswt" in user) {
        console.log("")
        delete users[userIndex].jswt
        await writeFile(users)
        res.status(200).json({ message : "log out succesfully" });
      } else {
        res.status(404).json({ message: null });
      }
    } else {
      res.status(404).json({ message: null });
    }
  } catch (error) {
    res.status(404).json({ message: "no data" });
  }
  // if (!id) {
  //   return null;
  // } else {
  //   const userFound = users.filter((user, index) => {
  //     if (user.id === id) {
  //       userIndex = index;
  //     }
  //   });
  //   delete users[userIndex].jswt;
  // }
};

module.exports = { createNewUser, login, getUser, logout };

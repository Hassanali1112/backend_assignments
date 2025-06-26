const fs = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt")
const { json } = require("stream/consumers");
const User  = require("../models/users.models.js");
require("dotenv").config()
const jwt = require("jsonwebtoken")


// const filePath = path.join(__dirname, "../usersData.json");

// const readData = async () =>{
//   try {
//     const users = await fs.readFile(filePath, "utf-8");
//     return JSON.parse(users);
//   } catch (error) {
//     return error
//   }
 
// }

// const writeFile = async (data) =>{
//   try {
//     await fs.writeFile(filePath, JSON.stringify(data, null, 2))
//     return res.json(users)
//   } catch (error) {
//     return error
//   }

// }

const JWT_SECRET = process.env.JWT_SECRET;


const generateToken = async (userId) =>{
  console.log(userId)
  console.log(JWT_SECRET)
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

// try {

//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.send("All fields are require!");
//   }

//   const users = await readData()
//   console.log(users)
//   if(users.length){
//     const userNotFound = users.filter((user) => user.email == email);
//     console.log(userNotFound)
//     if (userNotFound.length > 0) {
//       res.status(409).json({ message: "user with this email already exists!" });
//     } else {
//       const id = users.length;
//       const newUser = {
//         id: id + 1,
//         name,
//         email,
//         password,
//         role: false,
//       };
//       users.push(newUser);
//       const final = await writeFile(users)
//       console.log(final)
//       res.status(200).json(newUser);
//     }
//   }
// } catch (error) {
  
// }

}
// login function

const getUser = async (req, res) => {

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
  const token = await generateToken(user._id)

  res.cookie("token", token, {
    secure : true,
    maxAge : 2 * 24 * 60 * 60 * 1000,
  })

  res.status(201).json({
    message : "Login successfully",
    user : {username : user.name, email : user.email},
     token : token})

  } catch (error) {
    
  }



  // try {

  // let userIndex = null;

  // const { email, password } = req.body; 

  // if (!email || !password) {
  //   return res.status(400).json({ message: "All fields are required" });
  // }
  //   const users = await readData();

  //   if (!users.length) {
  //     return res.status(404).json({ message: "No users found" });
  //   }

  //   const user = users.find((userObj, index) => {
  //     if (userObj.email === email) {
  //       userIndex = index;
  //       return true;
  //     }
  //     return false;
  //   });


  //   console.log(user)

  //   if (!user) {
  //     return res.status(404).json({ message: "Email is incorrect!" });
  //   }

  //   if (user.password !== password) {
  //     return res.status(401).json({ message: "Password is incorrect!" });
  //   }

  //   users[userIndex].jswt = "you.are.welcome";
  //   await writeFile(users);

  //   return res.status(200).json({
  //     user,
  //     session: users[userIndex].jswt,
  //   });
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({ message: "Internal server error" });
  // }
};



const checkSession = async (req, res) => {
  
  const { id } = req.query;
  // console.log("id", id)

  if(!id){
    res.status(404).json({message : new Error()} )
  }

  try {
  const users = await readData();

  const user = users.find(userObj => userObj.id == id)
  console.log("user ",user)
  if (Object.keys(user).length !== 0) {
    console.log("jswt");

    if ("jswt" in user) {
      console.log("jswt");
      res.status(200).json({ session: user.jswt });
    } else {
      res.status(404).json({ session: null });
    }
  } else {
    res.status(404).json({ session: null });
  }
     
  } catch (error) {
    res.status(404).json({ session : new Error()})
  }

  
};

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

module.exports = { createNewUser, getUser, checkSession, logout };

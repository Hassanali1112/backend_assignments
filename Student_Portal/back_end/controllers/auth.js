const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../usersData.json");

const readData = async () =>{
  users = await fs.readFile(filePath , "utf-8");
  // console.log(" users data ",users)
  return JSON.parse(users);
}



const createNewUser = async (req, res) => {
  console.log("create user route")
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.send("All fields are require!");
  } 

try {
  const users = await readData()
  console.log(users)
  if(users.length){
    const userNotFound = users.filter((user) => user.email !== email);
    console.log(userNotFound)
    if (userNotFound.length == 0) {
      const id = users.length;
      const newUser = {
        id: id + 1,
        name,
        email,
        password,
        role: false,
      };
      // users.push(newUser);
      res.status(200).json(newUser);
    } else {
      res.status(500).json({ message: "user with this email already exists!" });
    }
  }
} catch (error) {
  
}
  
};


const getUser = async (req, res) => {
  let userIndex = null;
  
  const { email, password } = req.body

  if(!email || !password){
    return res.status(500).send({message : "all fields are required"})
  }

  try {
    const users = await readData()
    console.log(users)
    if(users.length){
    const userNotFound = users.filter((user) => user.email === email && user.password === password);
    res.status(200).json(userNotFound)

    } else {
      res.status(500).json({message : "email and password incorrect"})
    }
    
  } catch (error) {
    res.send({message : error})
  }

  const userFound = users.filter((user, index) => {
    if (user.email === email) {
      if (user.password === password) {
        loginUser = [{ ...userFound, jswt: "you.are.welcome!" }];
        res.status(200).json({ message: "sucess", user: loginUser });
        userIndex = index;
      } else {
        return res.status(200).json({ message: "password is incorrect!" });
      }
    } else {
      return res
        .status(200)
        .json({ message: "user with this email not exists!" });
    }
  });
  if (userFound.length) {
    users[userIndex].jswt = "you.are.welcome!";
    return;
  }
};

const checkSession = (req, res) => {
  if (!loginUser) {
    res.status(500).json({ message: null });
  } else {
    res.status(200).json({ message: loginUser.jswt });
  }
};

const logout = (req, res) => {
  let userIndex = null;
  const { id } = req.body;
  if (!id) {
    return null;
  } else {
    const userFound = users.filter((user, index) => {
      if (user.id === id) {
        userIndex = index;
      }
    });
    delete users[userIndex].jswt;
  }
};

module.exports = { createNewUser, getUser, checkSession, logout };

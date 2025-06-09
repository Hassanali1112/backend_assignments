const fs = require("fs").promises;
const path = require("path");
const { json } = require("stream/consumers");

const filePath = path.join(__dirname, "../usersData.json");

const readData = async () =>{
  try {
    const users = await fs.readFile(filePath, "utf-8");
    return JSON.parse(users);
  } catch (error) {
    return error
  }
 
}

const writeFile = async (data) =>{
  try {
    console.log("data =>", data)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    return res.json(users)
  } catch (error) {
    return error
  }

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
    const userNotFound = users.filter((user) => user.email == email);
    console.log(userNotFound)
    if (userNotFound.length > 0) {
      res.status(500).json({ message: "user with this email already exists!" });
      
    } else {
     
      const id = users.length;
      const newUser = {
        id: id + 1,
        name,
        email,
        password,
        role: false,
      };
      users.push(newUser);

      const final = await writeFile(users)
      console.log(final)

      res.status(200).json(newUser);
      res.send({ message: "welcome" });
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

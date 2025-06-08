let users = [
  {
    id : 1,
    name : "hassan ali",
    email : "dev.hassanali@gmail.com",
    password : 'hassan@gmail',
    role : true,
  }
]



const createNewUser = (req, res)=>{
  const {name, email, password} = req.body
  if(!name || !email || !password){
    return res.send("All fields are require!")
  }
 const userNotFound = users.filter(user => user.email !== email)

 if(userNotFound){
  const id = users.length;
  const newUser = {
    id : id + 1,
    name,
    email,
    password,
    role : false,
  }
  users.push(newUser)
  res.status(200).json(newUser)
 } else{
  res.status(500).json({ message: "user with this email already exists!" });
}}


const getUser = (req, res)=>{
  let userIndex = null;
  const {email, password} = req.body;
  const userFound = users.filter((user, index)=> {
  if(user.email === email){
    if(user.password === password){
       loginUser = [{...userFound, jswt : 'you.are.welcome!'}]
      res.status(200).json({message : "sucess", user : loginUser})
      userIndex = index
    } else{
     return res.status(200).json({message : "password is incorrect!"})
    }

  } else {
    return res
      .status(200)
      .json({ message: "user with this email not exists!" });
  }
   })
   if(userFound.length){
    users[userIndex].jswt = "you.are.welcome!";
    return
   }
}

const checkSession = (req, res)=>{
  if(!loginUser){
    res.status(500).json({message : null})
  } else {
    res.status(200).json({message : loginUser.jswt})
  }
}

const logout = (req, res)=>{
  let userIndex = null;
  const {id} =  req.body;
  if(!id){
    return null
  } else {
    const userFound = users.filter((user, index) => {
      if(user.id === id){
        userIndex = index
      }
    })
    delete users[userIndex].jswt 

  }
}

module.exports = {createNewUser, getUser, checkSession, logout}
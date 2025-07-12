const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
    lowerCase : true
  },
  email : {
    type : String,
    required : true,
    unique : true,
    lowerCase : true 
  },
  password : {
    type : String,
    required : true
  },
  role : {
    type : String,
    enum : ["student","teacher"],
    default : "student"
  }
},{
  timestamps : true
})


const User = mongoose.model("User", userSchema)
module.exports = User



// mongodb+srv://hassanali0111272:OvKbkQ7FbZ80cliJ@cluster0.rnnh53o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// OvKbkQ7FbZ80cliJ

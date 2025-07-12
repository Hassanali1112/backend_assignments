const mongoose = require("mongoose")

mongoose.connect(
  "mongodb+srv://hassan_ali:hassan1112@cluster0.vjtglel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

// mongodb+srv://hassanali:hassan1234@cluster0.vjtglel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// process.env.MONGODB_URI / process.env.DB_NAME
  // "mongodb+srv://hassanali:hassan1234@cluster0.vjtglel.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

module.exports = mongoose;
const express = require("express")
const authRoutes = require("./routes/auth")
require("dotenv").config()

const app = express()
const port= process.env.PORT


app.get("/", (req, res)=>{
  console.log("here is server")
  res.send("hello from server")
})

app.use('/auth',authRoutes)



app.listen(port, ()=> console.log(`server in on http://localhost:${port}`))
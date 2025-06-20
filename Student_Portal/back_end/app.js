const express = require("express")
const authRoutes = require("./routes/auth")
require("dotenv").config()
const cors = require("cors");
const  applicationsRouter  = require("./routes/applications");
const app = express();


app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});


const port= process.env.PORT


app.get("/", (req, res)=>{
  console.log("here is server")
  res.send("hello from server")
})

app.use('/api/auth',authRoutes)

app.use('/api/applications', applicationsRouter)





app.listen(port, ()=> console.log(`server in on http://localhost:${port}`))
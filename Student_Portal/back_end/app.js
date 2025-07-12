const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("./database/database.config");
const authRoutes = require("./routes/auth");
const applicationsRouter = require("./routes/applications");
const cookieParser = require("cookie-parser");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// MongoDB connection log
mongoose.connection.once("open", () => {
  console.log(" MongoDB Connected");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationsRouter);

// Default route
app.get("/", (req, res) => {
  console.log("hello from /")
  res.status(200).send(" Server is up and running!");
});


// Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});


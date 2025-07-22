const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("./database/database.config");
const authRoutes = require("./routes/auth");
const applicationsRouter = require("./routes/applications");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
app.set('strict routing', false); // Ignore trailing slashes
app.set('case sensitive routing', false); // Ignore case sensitivity

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// CORS Setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// Body parser & cookie parser


// MongoDB connection
mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationsRouter);

// Default route
app.get("/", (req, res) => {
  console.log("hello from /");
  res.status(200).send("Server is up and running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

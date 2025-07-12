const express = require("express")
const { getUser, createNewUser, checkSession, logout, login } = require("../controllers/auth")
const verifyToken = require("../middlewares")

const authRoutes = express.Router()

authRoutes.post('/login', login)
authRoutes.post('/signup', createNewUser)
authRoutes.get("/user/get", verifyToken, getUser);
authRoutes.get('/logout', logout)


module.exports = authRoutes;
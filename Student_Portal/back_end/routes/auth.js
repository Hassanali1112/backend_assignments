const express = require("express")
const { getUser, createNewUser, checkSession, logout } = require("../controllers/auth")

const authRoutes = express.Router()

authRoutes.get('/login', getUser)
authRoutes.post('/signup', createNewUser)
authRoutes.get('/session', checkSession)
authRoutes.put('/logout', logout)

module.exports = authRoutes;
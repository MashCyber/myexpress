const express = require('express');
const router = express.Router()
const userController = require("../contollers/userController")

router.post("/signup",userController.signup)
router.post("/login",userController.login)

module.exports = router;
// import express
const express = require('express')

//import userController
const userController = require('./controller/userController')

//import projectController
const projectController = require('./controller/projectController')

//import jwtmiddleware
const jwtMiddleware = require('./middleware/jwtMiddleware')

//import multer
const multerConfig = require("./middleware/multerMiddleware")

//instance router
const router = new express.Router()

//register
router.post('/register', userController.register)

//login
router.post('/login', userController.login)

//add-project
router.post('/add-project',jwtMiddleware, multerConfig.single("projectImage"), projectController.addProjectController)

//get all project
router.get('/all-project',jwtMiddleware, projectController.getAllProjectController)

//get home project

router.get('/home-project', projectController.getHomeProjectController)

//get user project

router.get('/user-project',jwtMiddleware, projectController.getUserProjectController)

//remove user project

router.delete('/remove-userProject/:id', jwtMiddleware, projectController.removeUserProjectController)

//update user project

router.put('/update-userProject/:id', jwtMiddleware,multerConfig.single("projectImage"),projectController.updateUserProjectController)


//update user profile

router.put('/update-userProfile', jwtMiddleware,multerConfig.single("profile"),userController.editProfileController)

module.exports = router
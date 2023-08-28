const express = require('express');
const users = express.Router();
const userController = require('../controllers/userController');

users.get('/', userController.checkloginuser);
users.post('/register', userController.create);
users.post('/login', userController.authenticate);


module.exports = users;
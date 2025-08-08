const express = require('express');
const router = express.Router();
const todoListController = require('../controller/todolistController');
const jwtToken = require('../middleware/jwtToken');


router.post('/createTodoList', jwtToken.protect, todoListController.createTodoList);
router.get('/get-to-do-list', jwtToken.protect, todoListController.getTodoList);
router.post('/update-todolist', jwtToken.protect, todoListController.updateTodoList);

module.exports = router;

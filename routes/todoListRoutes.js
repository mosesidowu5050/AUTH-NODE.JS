const express = require('express');
const router = express.Router();
const todoListController = require('../controller/todolistController');
const jwtToken = require('../middleware/jwtToken');


router.post('/createTodoList', jwtToken.protect, todoListController.createTodoList);
router.get('/get-to-do-list', jwtToken.protect, todoListController.getTodoList);
router.put('/update-todolist/:todolistId', jwtToken.protect, todoListController.updateTodoList);
router.delete('/delete-todo/:deleteId', jwtToken.protect, todoListController.deleteTodoListId);
router.get('/filter-by-date/:date', jwtToken.protect, todoListController.getTodoListByDate);


module.exports = router;

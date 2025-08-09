const TodoList = require('../models/TodoList');

exports.createTodoList = async (req, res) => {
    const { text } = req.body;
    const userId = req.user.id;

    if(!text){
        return res.this.status(400).json({ message: "Text cannot be empty. "});
    }

    try{
        const newTodo = new TodoList({text, user: userId});
        const createTodoList = await newTodo.save();

        res.status(201).json({ message: "To-Do-List created succesffuly. ", todo: createTodoList});
    } catch(error) {
        console.log('Error creating to-do-list', error);
        res.status(500).json({ message: "Server error creating To-Do-List. "});
    }
};


exports.getTodoList = async (req, res) => {
    const userId = req.user.id;

    if(!userId) {
        return res.status(400).json({ message: "User not authorized. "});
    }

    try{
        const getTodoList = await TodoList.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json({ 
            message: "Found all to-do-list. ", 
            todoList: getTodoList
        });
    } catch(error){
        console.log('Error fetching to-do-list.', error);
        res.status(500).json({ message: "Server error searching for to-do-list. "});
    }
};


exports.updateTodoList = async (req, res) => {
    const { todolistId } = req.params;
    const userId = req.user.id;
    const { text, completed } = req.body;

    if(!userId){
        return res.status(400).json({message: 'User not authorized. '});
    }

    try{
        let todo = await TodoList.findOne({ _id: todolistId, user: userId});
        
        if (!todo) {
            return res.status(404).json({ message: 'To-Do item not found or not authorized.' });
        }
        if (text !== undefined) {
            todo.text = text;
        }
        if (completed !== undefined) {
            todo.completed = completed;
        }


        const updateTodoList = await todo.save();
        res.status(200).json({
            message: 'To-Do item updated successfully!',
            todo: updateTodoList
        });
    } catch (error){
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Server error updating To-Do.' });
    }
};


exports.deleteTodoListId = async (req, res) => {
    const { deleteId } = req.params;
    const userId = req.user.id;

    if(!userId){
        return res.status(400).json({
            message: 'User not found. ',
        });
    }

    try{
        let deleteTodo = await TodoList.deleteOne({_id: deleteId, user: userId});
        if(deleteTodo.deletedCount === 0){
            return res.status(400).json({ message: 'To-Do-List is empty. ' });
        }
        
        return res.status(200).json({
            message: 'To-Do-List item deleted successffuly. '});
    } catch (error) {
        console.log('Error deleting todo: ', error);
        return res.status(500).json({
            message: 'Server error deleting To-Do.'
        });
    }
};



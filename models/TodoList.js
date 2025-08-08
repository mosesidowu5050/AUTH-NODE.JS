const mongoose = require('mongoose');

const TodoListSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 200
    },

    completed: {
        type: Boolean,
        default: false,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

const TodoList = mongoose.model('TodoList', TodoListSchema)

module.exports = TodoList;

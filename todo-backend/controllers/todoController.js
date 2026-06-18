const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
    if (!req.body) return res.status(400).send("Request body is missing. Check your headers.");
    
    try {
        const todo = new Todo({
            title: req.body.title,
            dueDate: req.body.dueDate || null,
            userId: req.user._id
        });

        await todo.save();
        res.status(201).send(todo);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getTodos = async (req, res) => {
    try {
        console.log('getTodos called with user:', req.user);
        const todos = await Todo.find({
            userId: req.user._id
        });
        res.send(todos);
    } catch (error) {
        res.status(500).send("Database Error: " + error.message);
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!todo) return res.status(404).send();

        res.send(todo);
    } catch (error) {
        res.status(500).send("Database Error: " + error.message);
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user._id
            },
            req.body,
            { new: true }
        );

        if (!todo) return res.status(404).send();

        res.send(todo);
    } catch (error) {
        res.status(500).send("Database Error: " + error.message);
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!todo) return res.status(404).send();

        res.send(todo);
    } catch (error) {
        res.status(500).send("Database Error: " + error.message);
    }
};


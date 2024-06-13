// controllers/taskController.js

const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const { name, date_day, date_hour, check } = req.body;
    
    if (!name) {
        res.status(422).json({ error: 'O nome da tarefa é obrigatório!' });
        return;
    }

    const task = { name, date_day, date_hour, check };

    try {
        await Task.create(task);
        res.status(201).json({ message: 'Tarefa inserida no sistema com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    const id = req.params.id;

    try {
        const task = await Task.findOne({ _id: id });
        if (!task) {
            res.status(422).json({ message: 'A tarefa não foi encontrada!' });
            return;
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const id = req.params.id;
    const { name, date_day, date_hour, check } = req.body;
    const task = { name, date_day, date_hour, check };

    try {
        const updatedTask = await Task.updateOne({ _id: id }, task);
        if (updatedTask.matchedCount === 0) {
            res.status(422).json({ message: 'A tarefa não foi encontrada!' });
            return;
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    const id = req.params.id;

    try {
        const task = await Task.findOne({ _id: id });
        if (!task) {
            res.status(422).json({ message: 'A tarefa não foi encontrada!' });
            return;
        }

        await Task.deleteOne({ _id: id });
        res.status(200).json({ message: 'Tarefa removida com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

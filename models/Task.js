// models/Task.js

const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    name: String,
    moment: String,
    category: String,
    check: Boolean,
})

module.exports = Task

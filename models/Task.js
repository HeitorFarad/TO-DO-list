// models/Task.js

const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    name: String,
    date_day: String,
    date_hour: String,
    check: Boolean,
})

module.exports = Task

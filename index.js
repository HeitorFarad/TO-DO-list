// index.js

const express = require('express');
const mongoose = require('mongoose');
const { DB_USER, DB_PASSWORD } = require('./config/database');
const taskController = require('./controllers/taskController');
const cors = require('cors')

const app = express();
const PORT = 3000;

app.use(cors());

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/tasks/create', taskController.createTask);

// Read - leitura de dados
app.get('/tasks', taskController.getAllTasks);
app.get('/taks/:id', taskController.getTaskById);

// Update - atualização de dados (PATCH)
app.patch('/tasks/:id', taskController.updateTask);

// Delete - deletar dados
app.delete('/tasks/:id', taskController.deleteTask);

// Conexão com o MongoDB e inicialização do servidor
mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.j2b5nbj.mongodb.net/bancodaapi?retryWrites=true&w=majority&appName=APICluster`)
    .then(() => {
        console.log("Conectamos ao MongoDB!");
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((err) => console.log(err));

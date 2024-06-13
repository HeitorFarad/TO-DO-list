// index.js

const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const { DB_USER, DB_PASSWORD } = require('./config/database');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rotas da API
app.use('/task', taskRoutes);

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

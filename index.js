//Your current IP address (179.177.165.86)

// config inicial
const express = require('express')
const app = express()
const mongoose = require('mongoose')

// forma de ler Json / middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// rotas da API
const taskRoutes = require('./routes/taskRoutes')

app.use('/Task', taskRoutes)

// rota inicial / endpoint
app.get('/', (req, res) => {
    
    // mostrar requisicao

    res.json({ message: 'Oi Express!'})

})

// entregar uma porta
const DB_USER = 'heitor'
const DB_PASSWORD = encodeURIComponent('kD-cyZ8cmL_qydW')

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.j2b5nbj.mongodb.net/bancodaapi?retryWrites=true&w=majority&appName=APICluster`,
    )
    .then(() => {
        console.log("Conectamos ao MongoDB!")
        app.listen(3000)

    })
    .catch((err) => console.log(err))

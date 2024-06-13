const router = require('express').Router()

const Task = require('../models/Task')

// Create - criação de dados
router.post('/', async (req, res) => {
    // req.body

    // {name: treino, date_day: 13/05/2024, date_hour: 08h18, check: false}
    const {name, date_day, date_hour, check} = req.body
    
    if (!name) {
        res.status(422).json({error: 'O nome da tarefa é obrigatório!'})
        return
    }

    const task = {
        name,
        date_day,
        date_hour,
        check,
    }

    try {
        //criando dados
        await Task.create(task)

        res.status(201).json({message: 'Tarefa inserida no sistema com sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// Read - leitura de dados

router.get('/', async (req, res) => {
    try {

        const people = await Task.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {
    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id

    try {
        const task = await Task.findOne({ _id: id })

        if(!task) {
            res.status(422).json({message: 'A tarefa não foi encontrada!'})
            return
        }
        
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({error: error})
    }

})

// Update - atualização de dados(PUT , PATCH)
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const {name, date_day, date_hour, check} = req.body

    const task = {
        name,
        date_day,
        date_hour,
        check,
    }

    try {
        const updateTask = await Task.updateOne({_id: id}, task)

        if(updateTask.matchedCount === 0) {
            res.status(422).json({message: 'A tarefa não foi encontrada!'})
            return
        }

        res.status(200).json(task)
    } catch(error) {
        res.status(500).json({ error: error })
    } 

})

// Delete - deletar dados
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const task = await Task.findOne({ _id: id })

    if(!task) {
           res.status(422).json({message: 'A tarefa não foi encontrada!'})
        return
    }

    try {

        await Task.deleteOne({_id: id})

        res.status(200).json({message: 'Tarefa removida com sucesso!'})

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

module.exports = router
// Write your "actions" router here!
const express = require('express');

const Action = require("./actions-model")

const router = require("express").Router()

router.get('/', (req, res) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch( () => {
            res.status(500).json({ message: "The actions can't be retrieved" })
        })
});

router.get('/:id', (req, res) => {
    Action.get(req.params.id)
    .then((action) => {
        if (!action) {
            res.status(404).json({ message: "No action with that id"})
        } else {
            res.status(200).json(action)
        }
    })
});

router.post('/', (req, res) => {
    Action.insert(req.body)
    .then((action) => {
        console.log(action)
        if (!req.body.description || !req.body.notes || !req.body.project_id) {
            res.status(400).json({message: "Description, project ID and notes are required"})
        } else {
            res.status(200).json(action)
        }
    })
    .catch(() => {
        res.status(500).json({message: "Can not post"})
    })
})

router.put('/:id', async (req, res) => {
    try {
        const updatedAction = await Action.update(req.params.id, req.body)
        if (!req.body.description || !req.body.notes || !req.body.project_id) {
            res.status(400).json({message: "Description, project ID and notes are required"})
        } else {
            res.status(200).json(updatedAction)
        }
    } catch (err) {
        res.status(500).json({ message: "Can not update"})
    }

})

router.delete('/:id', (req, res) => {
    
})

module.exports = router
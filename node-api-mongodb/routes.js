const express = require('express');

const router = express.Router()

const Posts = require('./posts.js');

router.get('/post', async (request, response) => {
    try {
        const data = await Posts.find();
        response.json(data)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
});

router.get('/post/:id', async (request, response) => {
    try {
        const data = await Posts.findById(request.params.id);
        response.json(data)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
});

router.post('/post', async (request, response) => {

    const data = new Posts({
        name: request.body.name,
        age: request.body.age
    });

    try {
        const dataToSave = await data.save();
        response.status(200).json(dataToSave);
    } catch (error) {
        response.status(400).json({message: error.message});
    }
});

router.patch('/post/:id', async (request, response) => {

    try {
        const id = request.params.id;
        const updatedData = request.body;
        const options = {new: true};

        const result = await Posts.findByIdAndUpdate(
            id, updatedData, options
        )

        response.send(result)
    } catch (error) {
        response.status(400).json({message: error.message})
    }
});

router.delete('/post/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const data = await Posts.findByIdAndDelete(id)
        response.send(`Document with ${data.name} has been deleted..`)
    } catch (error) {
        response.status(400).json({message: error.message})
    }
});

module.exports = router;
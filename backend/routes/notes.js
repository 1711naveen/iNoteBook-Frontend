const express = require('express')
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Routes:1
//Get all notes using get "/api/notes", login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.send(notes);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal server error' });
    }
})


//Routes:2
//Add a new note using post "/api/notes/addnote", login required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(404).json({ result: result.array() });
        // res.send({ errors: result.array() });
    }

    try {
        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal server error' });
    }
})

//Routes:3
//Update a existing note using put "/api/notes/updatenote", login required
router.put('/updatenote/:id', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(404).json({ result: result.array() });
        // res.send({ errors: result.array() });
    }

    try {
        const { title, description, tag } = req.body;
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        //Find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        return res.json({ note })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal server error' });
    }

})

//Routes:4
//Delete a existing note using delete "/api/notes/deltenote", login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        //Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Not found");
        }

        //
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id)
        return res.json("Sucess Note has been deleted")
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: 'Internal server error' });
    }
})


module.exports = router
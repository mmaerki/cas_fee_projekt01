'use strict';

var express = require('express');
var router = express.Router();
var notes = require('../controller/notesController.js');


router.get("/", notes.showNoteOverview);
router.get("/detail", notes.showNoteDetail);
router.get("/detail/:id", notes.editNote);
router.get("/notes", notes.getAllNotes);
router.get("/notes/:id", notes.getNoteById);
router.post("/notes", notes.createNote);
router.post("/notes/:id", notes.updateNote);

module.exports = router;

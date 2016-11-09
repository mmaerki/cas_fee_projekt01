'use strict'

const store = require('../services/notesStore.js');

module.exports.showNoteOverview = (req, res) => res.render('index.html');
module.exports.showNoteDetail = (req, res) => res.render('../public/html/edit.html');

module.exports.getAllNotes = (req, res) => {
  store.all(req.query.sortBy, (err, notes) => res.json(notes));
};

module.exports.getNoteById = (req, res) => {
  store.get(req.params.id, (err, note) => {
    res.json(note)
  });
};

module.exports.createNote = (req, res) => {
  store.add(req.body, (note) => {
    res.json(note);
  })
};

module.exports.editNote = (req, res) => {
  res.render('edit.html', null);
};

module.exports.updateNote = (req, res) => {
  store.update(req.body, (count) => {
    res.json(count);
  })
}

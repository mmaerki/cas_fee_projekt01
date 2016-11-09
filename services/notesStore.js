'use strict';

var Datastore = require('nedb');
var db = new Datastore({ filename: './data/note.db', autoload: true });

function publicGetAll(sort, callback) {
  const sortBy = sort.split(':')[0]; // field name
  const sortOrder = sort.split(':')[1]; // asc or desc

  db.find({}).sort({ [sortBy] : sortOrder }).exec((err, notes) => {
    callback(err, notes);
  });
}

function publicGet(id, callback) {
  db.findOne({ _id: id.toString() }, (err, note) => {
    callback(err, note);
  });
}

function publicAdd(note, callback)
{
  db.insert(note, function (err, newNote) {
    callback(newNote);
  });
}

function publicUpdate(note, callback)
{
  db.update({ _id: note.id}, note, {}, (err, updatedNote) => {
    callback(err, updatedNote);
  });
}

module.exports = {all: publicGetAll, get: publicGet, add: publicAdd, update: publicUpdate};

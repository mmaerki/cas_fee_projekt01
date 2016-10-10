var notesRepository = (function() {

  function publicGetNotes() {
    return storageModule.getData(CONSTANTS.STORAGE_KEY_NOTES);
  }

  function publicGetNoteById(id) {
    const notes = publicGetNotes();
    if (notes === null) {
      return null;
    }
    var _note = null;
    for (var i = 0; i < notes.length; i++) {
      const note = notes[i];
      if (note.id === id) {
        _note = note;
      }
    }
    return _note;
  }

  function publicGetNewId() {
    const notes = publicGetNotes();
    if (notes === null) {
      return 1;
    }
    return Math.max.apply(Math, notes.map(function(note){ return note.id; })) + 1;
  }

  function publicCompleteNote(id) {

  }

  function publicUpdateNote(note) {
    var notes = publicGetNotes();
    if (notes === null) {
      notes = [];
    }
    notes = $.grep(notes, function(e){
      return e.id !== note.id;
    });
    notes.push(note);
    storageModule.setData(CONSTANTS.STORAGE_KEY_NOTES, notes);
  }

  return {
    getNotes: publicGetNotes,
    getNoteById: publicGetNoteById,
    getNewId: publicGetNewId,
    updateNote: publicUpdateNote
  };
}());


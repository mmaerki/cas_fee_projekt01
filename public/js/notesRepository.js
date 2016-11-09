;(function(mmaNoteApp, serverStorage, localStorage, moment) {
  'use strict';

  mmaNoteApp.notesRepository = (function() {

    function publicGetNotes(callback) {
      var sortOrder = localStorage.getData(CONSTANTS.STORAGE_KEY_SORT);
      if (sortOrder === null) {
        sortOrder = CONSTANTS.SORT_BY_DUE_DATE;
      }
      serverStorage.getAll(sortOrder, callback);
    }

    function publicGetNoteById(id, callback) {
      serverStorage.get(id, callback);
    }

    function publicUpdateNote(note, callback) {
      if (note.id === null) {
        note.createDate = moment().format();
        note.modifiedDate = null;
        note.completionDate = null;
        serverStorage.add(note, callback);
      }
      else {
        note.modifiedDate = moment().format();
        serverStorage.update(note, callback);
      }
    }

    function publicChangeSortOrder(sortOrder) {
      localStorage.setData(CONSTANTS.STORAGE_KEY_SORT, sortOrder);
    }

    return {
      getNotes: publicGetNotes,
      getNoteById: publicGetNoteById,
      updateNote: publicUpdateNote,
      changeSortOrder: publicChangeSortOrder,
    };

  })();
})(window.mmaNoteApp = window.mmaNoteApp || {}, window.mmaNoteApp.serverStorageModule,
  window.mmaNoteApp.localStorageModule, moment);

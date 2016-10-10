'use strict';

$(document).ready(function() {
  // init style
  const stylePath = storageModule.getData(CONSTANTS.STORAGE_KEY_STYLE);
  if (stylePath !== null) {
    $('#styleId').attr('href', stylePath);
  }

  // init object
  const noteId = storageModule.getData(CONSTANTS.STORAGE_KEY_EDIT_ID);
  if (noteId !== null) {
    const note = notesRepository.getNoteById(noteId);
    if (note !== null) {
      // set title
      $('.edit-title').val('Note edit');

      $('#title').val(note.title);
      $('#description').val(note.description);
      $('#importance').val(note.importance);
      $('#dueDate').val(moment(note.dueDate).format('YYYY-MM-DD'));
    }
  }

  $('form').submit(function() {
    const noteId = storageModule.getData(CONSTANTS.STORAGE_KEY_EDIT_ID);
    const note = {
      id: noteId || notesRepository.getNewId(),
      title: $('#title').val(),
      description: $('#description').val(),
      importance: $('#importance').val(),
      completionDate: null,
      createDate: moment().format(),
      modifiedDate: noteId > 0 ? moment().format() : null,
      dueDate: moment($('#dueDate').val())
    };

    notesRepository.updateNote(note);
    storageModule.removeData(CONSTANTS.STORAGE_KEY_EDIT_ID);

    window.location = CONSTANTS.PAGE_OVERVIEW;
  });

  $('#cancelButton').on('click', function(e) {
    storageModule.removeData(CONSTANTS.STORAGE_KEY_EDIT_ID);
    window.location = CONSTANTS.PAGE_OVERVIEW;
    return false;
  });
});

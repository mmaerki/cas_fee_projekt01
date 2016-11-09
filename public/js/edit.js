;(function(mmaNoteApp, $) {
  'use strict';

  $(function() {
    // initialize
    mmaNoteApp.utilModule.showStyle(CONSTANTS.STYLE_ELEMENT_ID);

    // init object
    const noteId = mmaNoteApp.utilModule.getUrlParameter('id');
    if (noteId !== null) {
      mmaNoteApp.notesRepository.getNoteById(noteId, (note) => {
        $('.edit-title').text(note.title);
        $('#title').val(note.title);
        $('#description').val(note.description);
        $('#importance').val(note.importance);
        $('#dueDate').val(moment(note.dueDate).format('YYYY-MM-DD'));
      });
    }

    // submit
    $('form').submit(function() {
      const note = mmaNoteApp.note.createNote();
      note.id = noteId;
      note.title = $('#title').val();
      note.description = $('#description').val();
      note.importance = $('#importance').val();
      note.dueDate = moment($('#dueDate').val())

      mmaNoteApp.notesRepository.updateNote(note, function(e) {});
    });

    // cancel
    $('#cancelButton').on('click', function(e) {
      mmaNoteApp.utilModule.goToPage(CONSTANTS.PAGE_OVERVIEW);
      return false;
    });
  });

})(window.mmaNoteApp = window.mmaNoteApp || {}, jQuery);

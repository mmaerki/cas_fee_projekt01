;(function(mmaNoteApp, $, window, document, undefined) {
  "use strict";

  $(function() {
    // register handlebars helper functions
    mmaNoteApp.handlebarsModule.registerHelpers();

    // initialize
    mmaNoteApp.utilModule.showStyle(CONSTANTS.STYLE_ELEMENT_ID);
    $('#createNew').attr('href', CONSTANTS.PAGE_DETAIL);
    $('#styleDefault').val(CONSTANTS.STYLESHEET_DEFAULT);
    $('#styleBlackAndWhite').val(CONSTANTS.STYLESHEET_BLACK_AND_WHITE);
    $('#styleChanger').on('change', function() {
      mmaNoteApp.utilModule.setStyle(CONSTANTS.STYLE_ELEMENT_ID, $(this).val());
    });
    $('#sortByDueDate').on('click', function() {
      selectButton($(this));
      sort(CONSTANTS.SORT_BY_DUE_DATE);
    });
    $('#sortByCreationDate').on('click', function() {
      selectButton(this);
      sort(CONSTANTS.SORT_BY_CREATION_DATE);
    });
    $('#sortByImportance').on('click', function() {
      selectButton(this);
      sort(CONSTANTS.SORT_BY_IMPORTANCE);
    });
    $('#showDone').on('click', function() {
      filter();
    });

    function filter() {
      const showAllNotes = $('#showDone').is(':checked');
      if (showAllNotes) {
        $('.note-template').show();
        return;
      }
      $('.note-done[checked]').closest('.note-template').hide();
    }

    function sort(sortBy) {
      mmaNoteApp.notesRepository.changeSortOrder(sortBy);
      renderAllNotes();
    }

    function selectButton(button) {
      $('.selected-button').removeClass('selected-button');
      $(button).addClass('selected-button');
    }

    function renderNotes(notes) {
      var compiledHtml = '<div class="no-data">No data available!</div>';
      if (notes !== null && notes.length > 0) {
        // grab the template script
        var templateScript = $("#note-template").html();

        // compile the template
        var template = Handlebars.compile(templateScript);

        // pass our data to the template
        compiledHtml = template(notes);
      }
      // add the compiled html to the page
      $('.content-placeholder').html(compiledHtml);

      // add click events
      $('.note-done').on('click', function(e) {
        const noteId = $(this).closest('div').data('note-id');
        const isChecked = $(this).is(':checked');
        mmaNoteApp.notesRepository.getNoteById(noteId, (note) => {
          note.id = noteId;
          note.completionDate = isChecked ? moment().format() : null;
          mmaNoteApp.notesRepository.updateNote(note, function(e) {});
          renderAllNotes();
        });
      });
      $('.edit-button').on('click', function() {
        const noteId = $(this).closest('div').data('note-id');
        mmaNoteApp.utilModule.goToPage(CONSTANTS.PAGE_DETAIL + '?id=' + noteId);
      });
    }

    function renderAllNotes() {
      mmaNoteApp.notesRepository.getNotes((notes) => {
        renderNotes(notes);
        filter();
      });
    }

    // load data
    renderAllNotes();
  });
})(window.mmaNoteApp = window.mmaNoteApp || {}, jQuery, window, document);



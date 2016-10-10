;(function($) {
  "use strict";

  $(function () {

    function renderNotes(sortOrder) {
      // get data
      var notes = notesRepository.getNotes();
      if (notes !== null && !$('#showDone').is(':checked')) {
        notes = $.grep(notes, function(e){
          return e.completionDate === null;
        });
      }
      if (notes !== null && sortOrder !== undefined) {
        // sort notes
        notes = notes.sort(sortOrder);
      }
      // create notes
      createNotes(notes);
    }

    function createNotes(data) {
      var compiledHtml = '<div>No data available!</div>';
      if (data !== null) {
        // grab the template script
        var templateScript = $("#note-template").html();

        // compile the template
        var template = Handlebars.compile(templateScript);

        // pass our data to the template
        compiledHtml = template(data);
      }
      // add the compiled html to the page
      $('.content-placeholder').html(compiledHtml);
      $('.note-done').on('click', function() {
        const noteId = $(this).closest('div').data('note-id');
        const note = notesRepository.getNoteById(noteId);
        note.completionDate = moment().format();
        notesRepository.updateNote(note);
        renderNotes(compareDueDate);
      });
      $('.edit-button').on('click', function() {
        const noteId = $(this).closest('div').data('note-id');
        storageModule.setData(CONSTANTS.STORAGE_KEY_EDIT_ID, noteId);
        window.location = CONSTANTS.PAGE_DETAILS;
      });
    }

    function changeStyle(stylePath) {
      $('#styleId').attr('href', stylePath);
      storageModule.setData(CONSTANTS.STORAGE_KEY_STYLE, stylePath);
    }

    function compareDueDate(obj1, obj2) {
      return obj1.dueDate > obj2.dueDate
    }

    function compareCreationDate(obj1, obj2) {
      return obj1.createDate > obj2.createDate
    }

    function compareImportance(obj1, obj2) {
      return obj1.importance < obj2.importance
    }

    function selectButton(button) {
      $('.selected-button').removeClass('selected-button');
      $(button).addClass('selected-button');
    }

    $('#createNew').attr('href', CONSTANTS.PAGE_DETAILS);
    $('#styleChanger').on('change', function() {
      changeStyle($(this).val());
    });
    $('#styleDefault').val(CONSTANTS.STYLESHEET_DEFAULT);
    $('#styleBlackAndWhite').val(CONSTANTS.STYLESHEET_BLACK_AND_WHITE);

    $('#sortByDueDate').on('click', function() {
      renderNotes(compareDueDate);
      selectButton($(this));
    });

    $('#sortByCreationDate').on('click', function() {
      renderNotes(compareCreationDate);
      selectButton(this);
    });

    $('#sortByImportance').on('click', function() {
      renderNotes(compareImportance);
      selectButton(this);
    });
    $('#showDone').on('click', function() {
      renderNotes(compareDueDate);
    });

    Handlebars.registerHelper('times', function (n, block) {
      var accum = '';
      for (var i = 0; i < n; ++i) {
        accum += block.fn(i);
      }
      return accum;
    });

    Handlebars.registerHelper("formatDate", function(datetime) {
      if (moment) {
        return moment(datetime).format('DD. MMM YYYY');
      }
      else {
        return datetime;
      }
    });

    // init style
    const stylePath = storageModule.getData(CONSTANTS.STORAGE_KEY_STYLE);
    if (stylePath !== null) {
      $('#styleId').attr('href', stylePath);
    }

    // default
    renderNotes(compareDueDate);
  });
})(jQuery);

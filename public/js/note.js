(function (mmaNoteApp) {
  'use strict';

  mmaNoteApp.note = (function () {

    class Note {
    }

    function publicCreateNote() {
      return new Note();
    }

    return {
      createNote: publicCreateNote
    }
  })();
})(window.mmaNoteApp = window.mmaNoteApp|| {}, moment);

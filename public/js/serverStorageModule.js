;(function(mmaNoteApp, $) {
  'use strict';

  mmaNoteApp.serverStorageModule = (function() {

    function publicGetAll(sortBy, callback) {
      console.log('before publicGetAll request.');
      $.ajax({
        url: '/notes',
        cache: false,
        data: { sortBy },
        success: function(data, status) {
          callback(data);
        },
        error: function(xhr) {
          console.log('server storage module: error');
        },
        dataType: 'json',
        type: 'GET'
      })
    }

    function publicGet(id, callback) {
      console.log('before publicGet request.');
      $.ajax({
        url: '/notes/' + id,
        cache: false,
        data: {},
        success: function(data, status) {
          callback(data);
        },
        error: function(xhr) {
          console.log('server storage module: error');
        },
        dataType: 'json',
        type: 'GET'
      })
    }

    function publicAdd(note, callback) {
      console.log('before publicAdd request.');
      $.ajax({
        url: '/notes',
        cache: false,
        data: JSON.stringify(note),
        success: function(data, status) {
          callback();
        },
        error: function(xhr) {
          console.log('server storage module: error');
        },
        contentType: 'application/json',
        type: 'POST'
      })
    }

    function publicUpdate(note, callback) {
      console.log('before publicUpdate request.');
      $.ajax({
        url: '/notes/' + note._id,
        cache: false,
        data: JSON.stringify(note),
        success: function(data, status) {
          callback();
        },
        error: function(xhr) {
          console.log('server storage module: error');
        },
        dataType: 'json',
        contentType: 'application/json',
        type: 'POST'
      })
    }

    return {
      getAll: publicGetAll,
      get: publicGet,
      add: publicAdd,
      update: publicUpdate
    };
  })();
})(window.mmaNoteApp = window.mmaNoteApp || {}, jQuery);

;(function(mmaNoteApp, localStorage, $, window) {
  'use strict';

  mmaNoteApp.utilModule = (function() {

    function publicShowStyle(elementId) {
      const stylePath = localStorage.getData(CONSTANTS.STORAGE_KEY_STYLE);
      if (stylePath !== null) {
        $(elementId).attr('href', stylePath);
      }
    }

    function publicSetStyle(elementId, stylePath) {
      localStorage.setData(CONSTANTS.STORAGE_KEY_STYLE, stylePath);
      publicShowStyle(elementId);
    }

    function publicGoToPage(page) {
      window.location = page;
    }

    function publicGetUrlParameter(name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      if (results === null) {
        return null;
      }
      return results[1] || 0;
    }

    return {
      showStyle: publicShowStyle,
      setStyle: publicSetStyle,
      goToPage: publicGoToPage,
      getUrlParameter: publicGetUrlParameter
    };
  })();
})(window.mmaNoteApp = window.mmaNoteApp || {}, window.mmaNoteApp.localStorageModule, jQuery, window);

;(function(mmaNoteApp) {
  'use strict';

  mmaNoteApp.handlebarsModule = (function() {

    function privateInitHandlebarsIntl() {
      HandlebarsIntl.registerWith(Handlebars);
    }

    function privateFormatDate() {
      Handlebars.registerHelper("formatDate", function(datetime) {
        if (moment) {
          return moment(datetime).format('DD. MMM YYYY');
        }
        return datetime;
      });
    }

    function privateRepeater() {
      Handlebars.registerHelper('times', function (n, block) {
        var accum = '';
        for (var i = 0; i < n; ++i) {
          accum += block.fn(i);
        }
        return accum;
      });
    }

    function privateGetCheckedIfDone() {
      Handlebars.registerHelper('checkedIfDone', function (value) {
        return ((Date.parse(value) || 0) === 0) ? '' : 'checked';
      });
    }

    function publicRegisterHelpers() {
      privateInitHandlebarsIntl();
      privateFormatDate();
      privateRepeater();
      privateGetCheckedIfDone();
    }

    return {
      registerHelpers: publicRegisterHelpers
    };
  })();

})(window.mmaNoteApp = window.mmaNoteApp || {});

$(function () {
  renderNotes();
});

function renderNotes() {
  // get data
  const data = getData();
  if (data !== null) {
    // sort notes
  }
  // create notes
  createNotes(data);
  //createNotes(songs.sort(compareSongs));
}

function createNotes(data) {
  var compiledHtml = '<div>No data available!</div>';
  if (data === null) {
    // grab the template script
    var templateScript = $("#note-template").html();

    // compile the template
    var template = Handlebars.compile(templateScript);

    // pass our data to the template
    compiledHtml = template(data);
  }
  // add the compiled html to the page
  $('.content-placeholder').html(compiledHtml);
}

function changeStyle(style) {
  const stylePath = 'css/' + style.value;
  $('#styleId').attr('href', stylePath);

  setData('stylePath', stylePath);
}

function compareImportance(obj1, obj2) {
  return obj1.importance > obj2.importance
}

function compareModified(obj1, obj2) {
  return obj1.importance > obj2.importance
}

function sortBy(index) {
  var context = getData();
  context.sort(function(a, b){return a.importance > b.importance});
}



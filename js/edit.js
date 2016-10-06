$(document).ready(function() {
  // init style
  const stylePath = getData('stylePath');
  if (stylePath !== null) {
    $('#styleId').attr('href', stylePath);
  }

  // init object
  const note = getData('currentNote');
  if (note !== null) {
    $('#title').val(note.title);

  }
});

function onCancel(event) {
  event.preventDefault();
  alert('onCancel');
  window.location = 'index.html';
  return false;
}

function onSave(event) {
  alert('onSave');
  const note = {
    title: $('#title').val(),
    description: $('#description').val(),
    importance: $('#importance').val(),
    completionDate: null,
    createDate: moment().format(),
    modifiedDate: null,
    dueDate: moment($('#dueDate').val()).format('DD. MMM YYYY')
  };

  var notes = getData();
  if (notes === null) {
    notes = [];
  }
  notes.push(note);
  setData('notes', notes);

  window.location = 'index.html';
  return false;
}

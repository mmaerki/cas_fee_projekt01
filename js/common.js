function getData(key) {
  var value = localStorage.getItem(key);
  if(!value)
  {
    return null;
  }
  return JSON.parse(value);
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

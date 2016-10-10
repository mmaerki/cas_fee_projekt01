var storageModule = (function() {

  function publicGetData(key) {
    var value = localStorage.getItem(key);
    if(!value)
    {
      return null;
    }
    return JSON.parse(value);
  }

  function publicSetData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function publicRemoveData(key) {
    localStorage.removeItem(key);
  }

  return {
    getData: publicGetData,
    setData: publicSetData,
    removeData: publicRemoveData
  };
}());

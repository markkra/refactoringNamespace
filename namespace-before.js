(function IIFE(global) {

  // create or reuse the global NGAT object
  global.NGAT = global.NGAT || {};

  // cache a scoped reference to global.NGAT so the lookup is only done once.
  var NGAT = global.NGAT;

  NGAT.namespace = function () {
    var argList = convertToArray(arguments),
        countArgs = argList.length,
        delimiter = '.',
        o = global,
        i = 0,
        j = 0,
        d = '',
        arg = '';

    for (; i < countArgs; i++) {
      o = global;
      arg = argList[i];
      if (stringContains(arg, delimiter)) {
        d = arg.split(delimiter);
        for (j = 0; j < d.length; j++) {
          o[d[j]] = o[d[j]] || {};
          o = o[d[j]];
        }
      }
      else {
        o[arg] = o[arg] || {};
        o = o[arg];
      }
    }
    
    return o;
  };

  // tests
  NGAT.namespace("NGAT.fred.betty.pebbles.flintsone");
  printObject(NGAT);

  /////////////////////////////////////////////////
  // Define helper functions for use in this module

  // function to convert a JavaScript object to
  // JSON format
  function convertToJSON(obj){
    return JSON.stringify(obj, null, 4);
  }

  // log out a JavaScript object to the console
  function printObject(obj){
    console.log(convertToJSON(obj));
  }

  // convert an array-like object to a real array
  function convertToArray(arrayLikeObj){
    // assert arrayLikeObj object is an object with a 'length' method on it
    // See - https://davidwalsh.name/arguments-array
    return Array.prototype.slice.call(arrayLikeObj)
  }

  // determine if a string contains a substring
  function stringContains(str, subStr){
    return str.indexOf(subStr) > -1
  }

})(this);


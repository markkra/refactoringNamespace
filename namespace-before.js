(function IIFE(global) {

  // create or reuse the global NGAT object
  global.NGAT = global.NGAT || {};

  // cache a scoped reference to global.NGAT so the lookup is only done once.
  var NGAT = global.NGAT;

  NGAT.namespace = function () {
    var argList = convertToArray(arguments),
        countArgs = argList.length,
        delimiter = '.',
        currentObject = global,
        i = 0,
        j = 0,
        tokens = [],
        countTokens,
        arg = '';

    for (; i < countArgs; i++) {
      // keep a 'cursor' or reference to the leaf node
      // object of the chain of objects we'll build up
      // starting with the outmost scope aka the global object
      currentObject = global;

      // the current argument to namespace we're working with
      arg = argList[i];

      if (stringContains(arg, delimiter)) {
        // if this arg is a multisegment string
        tokens = tokenize(arg, delimiter);
        countTokens = tokens.length;
        for (j = 0; j < countTokens; j++) {
          currentObject[tokens[j]] = currentObject[tokens[j]] || {};
          currentObject = currentObject[tokens[j]];
        }
      }
      else {
        currentObject[arg] = currentObject[arg] || {};
        currentObject = currentObject[arg];
      }
    }

    return currentObject;
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

  // break a string up into tokens split on a delimiter
  function tokenize(str, delimiter){
    return str.split(delimiter);
  }
})(this);


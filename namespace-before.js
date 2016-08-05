(function IIFE(global) {

  // create or reuse the global NGAT object
  global.NGAT = global.NGAT || {};

  // cache a scoped reference to global.NGAT so the lookup is only done once.
  var NGAT = global.NGAT;

  NGAT.namespace = function () {
    var argList = convertToArray(arguments),
        currentObject = global;

    argList.forEach(function(arg) {
      // keep a 'cursor' or reference to the leaf node
      // object of the chain of objects we'll build up
      // starting with the outmost scope aka the global object
      var delimiter = '.',
          j = 0,
          tokens = [];

      if (stringContains(arg, delimiter)) {
        // if this arg is a multi-segment string,
        // break it down to an array of tokens
        tokens = tokenize(arg, delimiter);

        tokens.forEach(function(propName) {
          currentObject[propName] = currentObject[propName] || {};
          currentObject = currentObject[propName];
        });

      }
      else {
        currentObject[arg] = currentObject[arg] || {};
        currentObject = currentObject[arg];
      }
    });

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


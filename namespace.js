(function IIFE() {
    'use strict';

    var NGAT = NGAT || {};

    function stringContains(str, val) {
        return str.indexOf(val) > -1;
    }

    function tokenizeString(str, char) {
        return str.split(char);
    }

    function prettyPrintObj(obj) {
        return JSON.stringify(obj, null, 4);
    }

    function logObj(obj) {
        console.log(prettyPrintObj(obj));
    }

    function globalObject() {
        // returns a reference to the global object based on environment. So in a browser
        // that's the 'window' object and in node it's the 'global' object
        return (typeof window !== 'undefined' && typeof window === 'object') ? window : global;
    }

    NGAT.namespace = function namespace() {
        // should be checking that any and all arguments to this function are strings
        var args = Array.prototype.slice.apply(arguments),
            refCurrObj = globalObject(),
            tokens = [],
            delimiter = '.';

        // loop through all the arguments passed into the namespace() function
        args.forEach(function (currentArgument) {
            // refCurObj is a 'cursor' of sorts keeping a reference to an object
            // in the object hierarchy at the level we're at starting with the
            // global object as the 'root' of the tree of objects.
            // It repeats for each argument to the namespace function
            refCurrObj = globalObject();

            if (stringContains(currentArgument, delimiter)) {
                // if this argument has a string with the delimiter character, ex. '.' character,
                // then break up the string into an array of individual string 'tokens'
                tokens = tokenizeString(currentArgument, delimiter);

                // here we loop through all the tokens and create a property on the current object
                // represented by refCurrObj - starting with the global object and building nested
                // objects in a nested treelike way
                tokens.forEach(function (objName) {
                    // create an object property with this token name on the current
                    // object at this level if it's not there already
                    refCurrObj[objName] = refCurrObj[objName] || {};

                    // bump our 'cursor' reference to point to the property
                    refCurrObj = refCurrObj[objName];
                });

            } else {
                // hmmm, no delimiters in the argument, oh well, just
                // create a property on the refCurrObj which for the most part
                // will probably be the global object
                refCurrObj[currentArgument] = refCurrObj[currentArgument] || {};
                refCurrObj = refCurrObj[currentArgument];
            }
        });

        // returns a reference to the deepest level of the last argument in the list of arguments to namespace()
        // Hmmm, that seems like a strange thing to return doesn't it??? See 'namespace2' below.
        return refCurrObj;
    };

    // Instead of returning just a reference to the last object created as the namespace() function
    // does above, here's another version that returns an array of references to the objects created
    // for each argument passed to the function.
    NGAT.namespace2 = function namespace2() {
        var args = Array.prototype.slice.apply(arguments),
            refCurrObj = globalObject(),
            tokens,
            delimiter = '.';

        return args.map(function (currentArgument) {
            refCurrObj = globalObject();

            if (stringContains(currentArgument, delimiter)) {
                tokens = tokenizeString(currentArgument, delimiter);
                tokens.forEach(function (objName) {
                    refCurrObj[objName] = refCurrObj[objName] || {};
                    refCurrObj = refCurrObj[objName];
                });

            } else {
                refCurrObj[currentArgument] = refCurrObj[currentArgument] || {};
                refCurrObj = refCurrObj[currentArgument];
            }

            return refCurrObj;
        });
    };

    // Let's give it try
    var someObj = NGAT.namespace2(
        'NGAT.gorilla.mighty.joe.young',
        'NGAT.gorilla.king.kong',
        'NGAT.level1.level2.level3.level4.level5',
        'NGAT.fred_flintstone_stoneage_caveman');

    someObj[3].petName = 'Pebbles';

    logObj(globalObject().NGAT);
})();

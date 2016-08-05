(function IIFE(global) {

  global.NGAT = global.NGAT || {};
  
  global.NGAT.namespace = function () {
    var a = arguments, o, i = 0, j, d, arg;

    for (; i < a.length; i++) {
      o = global;
      arg = a[i];
      if (arg.indexOf(".") > -1) {
        d = arg.split(".");
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

})(this);


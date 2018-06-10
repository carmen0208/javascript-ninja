var currying = function(fn){
  
  var args = [];
  return function(){
      if(!!arguments.length) {
          [].push.apply(args, arguments);
          return arguments.callee;
      } else {
          return fn.apply(this, args);
      }
  }
  }
var sum = (function(num){
  var ret = 0;
  return function(){
      for(var i = 0, len = arguments.length; i < len; i++) {
          ret += arguments[i];
      }
      return ret;
  }
  })();
  debugger;
var newSum = currying(sum);
newSum(1)(2)(3)(4)()  // 10
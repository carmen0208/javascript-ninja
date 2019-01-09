function curry0 (fn) {
  return fn()
}
function curry1 (fn) {
  return (a1) => {
    return fn(a1)
  }
}
function curry2 (fn) {
  return (a1) => {
    return (a2) => {
      return fn(a1, a2)
    }
  }
}
function curry3 (fn) {
  return (a1) => {
    return (a2) => {
      return (a3) => {
        return fn(a1, a2, a3)
      }
    }
  }
}

// function curryN(fn){
//   return (a1) => {
//     return (a2) => {
//       ...
//       return (aN) => {
//         // N-th nested function
//         return fn(a1, a2, ... aN)
//       }
//     }
//   }
// }

function curry (fn) {
  return nest(fn, [])
}

function nest (fn, prevArgs) {
  return (currentArg) => {
    const args = [...prevArgs, currentArg]
    if (args.length === fn.length) {
      return fn(...args)
    }
    return nest(fn, args)
  }
}

function add (x, y, z) {
  return x + y + z
}

console.log(curry(add)(1))
console.log(curry(add)(1)(2))
console.log(curry(add)(1)(2)(3))

function curryCombine (fn) {
  return (function nest (prevArgs) {
    return (currentArg) => {
      const args = [...prevArgs, currentArg]
      if (args.length === fn.length) {
        return fn(...args)
      }
      return nest(args)
    }
  })([])
}

console.log(curryCombine(add)(1))
console.log(curryCombine(add)(1)(2))
console.log(curryCombine(add)(1)(2)(3))

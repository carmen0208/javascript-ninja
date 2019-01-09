const partial =
  (fn, ...presetArgs) =>
    (...laterArgs) =>
      fn(...presetArgs, ...laterArgs)

// example 1
const add =
  (x, y) =>
    x + y

console.log(partial(add, 5)(6))
console.log([1, 2, 3, 4, 5].map(partial(add, 5)))

// example 2
const getPerson = partial(console.log, '[carmen,nico]')
const getCarmen = partial(getPerson, '\'s carmen')
const getNico = partial(getPerson, '\'s Nico')
getPerson()
getCarmen('say hi to you')
getNico('say hi to you')

// partialRight
const partialRight =
  (fn, ...presetArgs) =>
    (...laterArgs) =>
      fn(...laterArgs, ...presetArgs)

function foo (x, y, z, ...rest) {
  console.log(x, y, z, rest)
}

var f = partialRight(foo, 'z:last')

f(1, 2) // 1 2 'z:last' []
f(1) // 1 'z:last' undefined []
f(1, 2, 3) // 1 2 3 ['z:last']
f(1, 2, 3, 4) // 1 2 3 [4,'z:last']

var spreadArgs =
  fn =>
    argsArr =>
      fn(...argsArr)

function add (a, b, c) {
  return a + b + c
}

console.log(spreadArgs(add)([1, 2, 3]))

const reducer = (accumulator, currentValue) => accumulator + currentValue

var gatherArgs =
  fn =>
    (...argsArr) =>
      fn(argsArr)

const arrayAdd = (array) =>
  array.reduce(reducer, 0)

console.log(gatherArgs(arrayAdd)(1, 2, 3, 4))

const R = require('ramda')

const multply = (x, y) => x * y
const addOne = (x) => x + 1
const square = (x) => x * x

const pipOperator = R.pipe(
  multply,
  addOne,
  square
)

console.log(pipOperator(10, 1))

// How Compose works:
// compose ：compose(f, g)(value)  === f(g(value))
const composeOperator = R.compose(
  square,
  addOne,
  multply
)

console.log(composeOperator(10, 1))

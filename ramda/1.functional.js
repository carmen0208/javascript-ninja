const R = require('ramda')

const double = x => x * 2

console.log(`function double's value = ${double(4)}`)

const print = value => console.log(` value: ${value}`)

const testArray = [1, 2, 3, 4]
console.log(`Orignal Array: ${testArray}`)
console.log(`ForEach, print as a function of input:`)
R.forEach(print, testArray)

console.log(`map, double as a input:`)
const afterdouble = R.map(double, testArray)
console.log(`after Double: ${afterdouble}`)

const isEven = (value) => value % 2 === 0
console.log(`afterFilter with isEven: ${R.filter(isEven, testArray)}`)

const findValue = R.find(isEven, testArray)
console.log(`find: onlye return the first value equals true: ${findValue}`)

const add = (startValue, value) => startValue + value
const sum = R.reduce(add, 100, testArray)
console.log(`reduce function, get add and 100 ad a initial value, it returns ${sum}`)

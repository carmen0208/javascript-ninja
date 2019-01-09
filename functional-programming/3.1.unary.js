var unary =
  fn =>
    arg =>
      fn(arg)

var wrongresult = ['1', '2', '3', '4'].map(parseInt)
console.log(`wrongresult: ${wrongresult}`)

var rightResult = ['1', '2', '3', '4'].map(unary(parseInt))
console.log(`rightResult: ${rightResult}`)

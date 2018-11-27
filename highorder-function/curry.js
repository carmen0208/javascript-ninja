function _sum3 (x, y, z) {
  return x + y + z
}
console.log(`without curry function: sum = ${_sum3(1, 2, 3)}`)

const sum3 = (x) => {
  return (y) => {
    return (z) => {
      return _sum3(x, y, z)
    }
  }
}
console.log(`with curry function: sum = ${sum3(1)(2)(3)}`)

// Generall Curry with Curry Wrapper

const curry = (fn) => {
  return (x) => {
    return (y) => {
      return (z) => {
        return fn(x, y, z)
      }
    }
  }
}
const sum3Wrapper = curry(_sum3)

console.log(`with curry function wrapper: sum = ${sum3Wrapper(1)(2)(3)}`)

// functions of all arity

const nest = (fn, i, args) => {
  return (x) => {
    args.push(x)
    // fn.length is how many args that contains in that function
    if(fn.length === i) {
      return fn(...args)
    }
    return nest(fn, i + 1, args)
  }
}

const curryInfinite = (fn) => {
  if (fn.length === 0) {
    return fn
  }

  const args = []
  return nest(fn, 1, args)
}

const log1 = curryInfinite((x) => console.log(x))
log1(10) // 10
const log2 = curryInfinite((x, y) => console.log(x, y))
log2(10)(20) // 10 20

// refactoring of curryInfinite

const curryInfiniteInside = (fn) => {
  if (fn.length === 0) {
    return fn
  }

  const nestInside = (N, args) => {
    return (x) => {
      // fn.length is how many args that contains in that function
      if (N - 1 === 0) {
        return fn(...args, x)
      }
      return nestInside(N - 1, [...args, x])
    }
  }
  return nestInside(fn.length, [])
}

const sum3b = curryInfiniteInside((x, y, z) => {
  return x + y + z
})
const sum5 = curryInfiniteInside((a, b, c, d, e) => {
  return a + b + c + d + e
})
console.log(`with curry function with artiy arguement: sum = ${sum3b(1)(2)(3)}`) // 6
console.log(`with curry function with artiy arguement: sum = ${sum5(1)(2)(3)(4)(5)}`) // 15

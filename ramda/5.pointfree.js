const R = require('Ramda')

// Normal:
const forever21 = age => R.ifElse(R.gte(R.__, 21), R.always(21), R.inc)(age)
// Point Free:
const forever21_pointFree = R.ifElse(R.gte(R.__, 21), R.always(21), R.inc)

// Multi-argument Functions
const members = [
  { name: 'carmen', year: 1982 },
  { name: 'Ruolin', year: 1985 },
  { name: 'carmen3', year: 1982 },
  { name: 'carmen4', year: 1994 },
  { name: 'carmen5', year: 1982 }
]

const membersBornInYearChangedArguementOrder = (year, member) => member.year === year

const curryedMemberBornInYear = R.curry(membersBornInYearChangedArguementOrder)

// Normal:
const pipelineCurriedNameForYear = R.curry((year, members) =>
  R.pipe(
    R.filter(curryedMemberBornInYear(year)),
    R.map(member => member.name)
  )(members)
)

// Point Free:
const pipelineCurriedNameForYear_PointFree = year =>
  R.pipe(
    R.filter(curryedMemberBornInYear(year)),
    R.map(member => member.name)
  )
// Then? High Order Function
console.log(pipelineCurriedNameForYear_PointFree(1994)(members))

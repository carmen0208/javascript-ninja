const R = require('Ramda')

const members = [
  { name: 'carmen', year: 1982 },
  { name: 'Ruolin', year: 1985 },
  { name: 'carmen3', year: 1982 },
  { name: 'carmen4', year: 1994 },
  { name: 'carmen5', year: 1982 }
]

// Normal
const membersBornInYear = (member, year) => member.year === year
const nameForYear = (member, year) => {
  const selected = R.filter(member => membersBornInYear(member, year), members)
  return R.map(member => member.name, selected)
}

console.log(`Normal : ${nameForYear(members, 1994)}`)

// Partial
const nameForYear2 = (member, year) => {
  const selected = R.filter(R.partialRight(membersBornInYear, [year]), members)
  return R.map(member => member.name, selected)
}

console.log(`Partial : ${nameForYear2(members, 1994)}`)

// Curry
const membersBornInYearChangedArguementOrder = (year, member) => member.year === year

const curryedMemberBornInYear = R.curry(membersBornInYearChangedArguementOrder)

const curriedNameForYear = (members, year) => {
  const selected = R.filter(curryedMemberBornInYear(year), members)
  return R.map(member => member.name, selected)
}

console.log(`Curry : ${curriedNameForYear(members, 1994)}`)

// flip arguments
const curriedflipedNameForYear = (members, year) => {
  const selected = R.filter(R.flip(R.curry(membersBornInYear))(year), members)
  return R.map(member => member.name, selected)
}

console.log(`flip arguments : ${curriedflipedNameForYear(members, 1994)}`)

// Placeholder
const curriedPlaceHolderNameForYear = (members, year) => {
  const selected = R.filter(R.curry(membersBornInYear)(R.__, year), members)
  return R.map(member => member.name, selected)
}

console.log(`Placeholder : ${curriedPlaceHolderNameForYear(members, 1994)}`)

// Pipeline
// Ramda’s conventions of data-last
const pipelineCurriedNameForYear = R.curry((year, members) =>
  R.pipe(
    R.filter(curryedMemberBornInYear(year)),
    R.map(member => member.name)
  )(members)
)

console.log(`Pipeline : ${pipelineCurriedNameForYear(1994, members)}`)

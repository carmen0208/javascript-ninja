const R = require('Ramda')

// Arthmeitc
// Ramda provides add, subtract, multiply, and divide
const square = (x) => R.multiply(x, x)
const operator = R.pipe(
  R.multiply,
  R.subtract(1),
  square
)
console.log(`Arthmetic: ${operator(3, 7)}`)

const operator2 = R.pipe(
  R.multiply,
  R.dec,
  square
)
console.log(`Arthmetic(decrease): ${operator2(3, 7)}`)

// Comparison

// naturalized citizen: 引进，后来入籍的人
let persons = [{
  'name': 'Lucy',
  'naturalizationDate': '',
  'birthContry': 'New Zealand',
  'age': 20
}, {
  'name': 'Lily',
  'naturalizationDate': '',
  'birthContry': 'China',
  'age': 29
}, {
  'name': 'Kitty',
  'naturalizationDate': '',
  'birthContry': 'USA',
  'age': 22
}, {
  'name': 'xiami',
  'naturalizationDate': '2016',
  'birthContry': 'Japan',
  'age': 22
}, {
  'name': 'Carmen',
  'naturalizationDate': '2020',
  'birthContry': 'China',
  'age': 22
}]

const OUR_COUNTRY = 'New Zealand'
// --> Imperative way:
const wasBornInCountry = person => person.birthContry === OUR_COUNTRY
const wasNaturalized = person => Boolean(person.naturalizationDate)
const isOver18 = person => person.age >= 18

const isCitizen = wasBornInCountry || wasNaturalized
const isEligibleToVote = isOver18 && isCitizen

// --> Declarative Way:
const wasBornInCountry2 = person => R.equals(person.birthContry, OUR_COUNTRY)
const wasNaturalized2 = person => Boolean(person.naturalizationDate)
const isOver18b = person => R.gte(person.age, 18)

const isCitizen2 = R.either(wasBornInCountry2, wasNaturalized2)
const isEligibleToVote2 = R.both(isCitizen2, isOver18b)

console.log(R.filter(isEligibleToVote2)(persons))

// console.log(R.equals(R.filter(isEligibleToVote)(persons), R.filter(isEligibleToVote2)(persons)))

// Logic
// --> Imperative way:
const age = persons[0].age || 100
// --> Declarative Way:
const age2 = R.defaultTo(100, persons[0].age)

// Condition

// --> Imperative way:
const forever21 = age => age >= 21 ? 21 : age + 1
// --> Declarative Way:
const forever21b = age => R.ifElse(R.gte(R.__, 21), R.always(21), R.inc)(age)
// console.log('------------check if the Declarative way of condition works --------')
// console.log(forever21b(18))

// console.log(forever21b(50))

const forever21c = age => R.ifElse(R.gte(R.__, 21), R.always(21), R.identity)(age)
// console.log(forever21c(18))
// --> --> when and unless
const alwaysDrivingAgeWhen = age => R.when(R.lt(R.__, 16), R.always(16))(age)
const alwaysDrivingAgeUnless = age => R.unless(R.gte(R.__, 16), R.always(16))(age)

console.log(alwaysDrivingAgeWhen(18))
console.log(alwaysDrivingAgeUnless(18))

// --> --> conditions

const water = temperature => R.cond([
  [R.lte(R.__, 0), R.always('water freezes at 0°C')],
  [R.gte(R.__, 100), R.always('water boils at 100°C')],
  [R.T, temp => `nothing special happens at ${temp}°C`]
])(temperature)
console.log('------------check if the condition works --------')
console.log(water(23))

console.log(water(-110))
console.log(water(110))
const R = require('Ramda')
const OUR_COUNTRY = 'New Zealand'
const wasBornInCountry = person => R.equals(person.birthCountry, OUR_COUNTRY)
const wasNaturalized = person => Boolean(person.naturalizationDate)
const isOver18 = person => R.gte(person.age, 18)

// Prop and pointfree this

const wasBornInCountryProp = person => R.equals(OUR_COUNTRY, R.prop('birthCountry', person))
const wasNaturalizedProp = person => Boolean(R.prop('naturalizationDate', person))
const isOver18Prop = person => R.gte(R.prop('age', person), 18)
// == curry
const wasBornInCountryPropCurry = person => R.equals(OUR_COUNTRY)(R.prop('birthCountry', person))
const wasNaturalizedPropCurry = person => Boolean(R.prop('naturalizationDate', person))
const isOver18PropCurry = person => R.gte(R.__, 18)(R.prop('age', person))

// == More curry
const wasBornInCountryPropCurryMore = person => R.equals(OUR_COUNTRY)(R.prop('birthCountry')(person))
const wasNaturalizedPropCurryMore = person => Boolean(R.prop('naturalizationDate')(person))
const isOver18PropCurryMore = person => R.gte(R.__, 18)(R.prop('age')(person))

// == More curry + Compose
const wasBornInCountryPropCurryMoreCompose = person => R.compose(R.equals(OUR_COUNTRY), R.prop('birthCountry'))(person)
const wasNaturalizedPropCurryMoreCompose = person => R.compose(Boolean, R.prop('naturalizationDate'))(person)
const isOver18PropCurryMoreCompose = person => R.compose(R.gte(R.__, 18), R.prop('age'))(person)

// Point Free
const wasBornInCountryPointFree = R.compose(R.equals(OUR_COUNTRY), R.prop('birthCountry'))
const wasNaturalizedPointFree = R.compose(Boolean, R.prop('naturalizationDate'))
const isOver18PointFree = R.compose(R.gte(R.__, 18), R.prop('age'))

// Other function rather than Prop:

const pickPerson = person => R.pick(['name', 'age'], person)
const hasPerson = person => R.has('name', person)

// Where prop reads a property from an object, path dives into nested objects. 
const pickPerson2 = person => R.path(['address', 'zipCode'], person)

// propOr and pathOr are similar to prop and path combined with defaultTo

// Add, Update Objects
// assoc returns a new object with the added or updated property value, leaving the original object unchanged.
const updatedPerson = person => R.assoc('name', 'New name', person)
const deletePerson = person => R.dissoc('age', person)

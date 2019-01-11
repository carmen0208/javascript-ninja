function compose2 (fn1, fn2) {
  return function composed (origValue) {
    return fn1(fn2(origValue))
  }
}

function compose (...fns) {
  return function composed (result) {
    var list = [...fns]
    while (list.length > 0) {
      result = list.pop()(result)
    }
    return result
  }
}
// test function
function words(str) {
  return String(str)
    .toLowerCase()
    .split(/\s|\b/)
    .filter(function alpha (v) {
      return /^[\w]+$/.test(v)
    })
}

function unique(list) {
  var uniqList = []
  for (let v of list) {
    // value not yet in the new list?
    if (uniqList.indexOf(v) === -1) {
      uniqList.push(v)
    }
  }
  return uniqList
}
function skipShortWords(words) {
  var filteredWords = []
  for (let word of words) {
    if (word.length > 4) {
      filteredWords.push(word)
    }
  }
  return filteredWords
}
// TEST
var text = 'To compose two functions together, pass the output of the first function call as the input of the second function call.'
// var wordsFound = words(text)
// var wordsUsed = unique(wordsFound)
// console.log(wordsUsed)

var uniqueWords = compose2(unique, words)
console.log(uniqueWords(text))

var biggerWords = compose(skipShortWords, unique, words)
console.log(biggerWords(text))

// something interesting more
// partialRight
const partialRight =
  (fn, ...presetArgs) =>
    (...laterArgs) =>
      fn(...laterArgs, ...presetArgs)
// test function
function skipLongWords (words) {
  var filteredWords = []
  for (let word of words) {
    if (word.length <= 4) {
      filteredWords.push(word)
    }
  }
  return filteredWords
}

var filterWords = partialRight(compose, unique, words)
var biggerWords2 = filterWords(skipShortWords)
var shorterWords = filterWords(skipLongWords)
console.log(biggerWords2(text))
console.log(shorterWords(text))

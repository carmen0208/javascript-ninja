function partial (fn, ...presentArgs) {
  return function partialApplied (...laterArgs) {
    return fn(...presentArgs, ...laterArgs)
  }
}

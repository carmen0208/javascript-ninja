## About

this is the place to understand Ramdajs, more important: Get more understand of FP by using Ramdajs

#### Functional is a first citizen

* [Basic Function](1.functional.js)

#### Pipline VS Compose

* How Pipeline Works? value of first function is the input the next function
* How Compose Works? compose(f, g)(value) === f(g(value))

##### Compse or Pipe?
* Pipe is easiest to understand when comming from a more imperative background since you read the function from left to right
* Compose is a bite easier to translate to nested-function form like this: `compose(f, g)(value) === f(g(value))`, that's also why Compose read the fuction from right to left


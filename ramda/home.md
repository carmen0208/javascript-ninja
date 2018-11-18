## About

This is the place to understand Ramdajs, more important: Get more understand of FP by using Ramdajs

#### Functional is a first citizen

* [Basic Function](1.functional.js)

#### Pipline VS Compose

* How Pipeline Works? value of first function is the input the next function
* How Compose Works? compose(f, g)(value) === f(g(value))

##### Compse or Pipe?
* Pipe is easiest to understand when comming from a more imperative background since you read the function from left to right
* Compose is a bite easier to translate to nested-function form like this: `compose(f, g)(value) === f(g(value))`, that's also why Compose read the fuction from right to left

#### Partial Application

* How can we end up using pipline if we want to use functiona that take more than one argument?

  The answer is by using
    * `High order function` with `curry` (All functions in Ramda are naturally curried, like filter, map etc)
    * The notion to put data in the end argument.(Some extra useful tools: `partial`, `placeholder`, `flip` which can deal with the order of the argument, but as long as you put data in the end argument, everything is fine)

  [Example](3.partial_application.js)
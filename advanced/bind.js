const test = {
  name : "carmen",
  getName: function() {
    return this.name
  }
}

test.getName();

const retriveNameFunc = test.getName;
console.log(retriveNameFunc());
const bindNameFunc = retriveNameFunc.bind(test);
// bindNameFunc();

console.log(bindNameFunc());
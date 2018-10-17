function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    alert(this.name)
  }
}

let person1 = new Person('judy', '5', 'freelance')

console.log(person1)

class PersonClass {
  constructor(name, age, job) {
    this.name = name
    this.age = age
    this.job = job
  }

  sayName() {
    alert(this.name)
  }
}

const person2 = new PersonClass('kitty', '44','CEO')
console.log(person2)

function createTargetComponent () {
  class TargetComponent {
    componentDidUpdate () {
      console.log('componentDidUpdate -- From TargetComponent')
      return true
    }
  }
  return TargetComponent
}

// change the method by directly put it into class and change that method
class Target extends createTargetComponent() {
  componentDidUpdate () {
    console.log('componentDidUpdate -- extends TargetComponent')
    return false
  }
}

// Target.componentDidUpdate()
// Target.prototype.componentDidUpdate()

new Target().componentDidUpdate()

function createTargetComponent () {
  class TargetComponent {
    componentDidUpdate () {
      console.log('componentDidUpdate -- From TargetComponent')
      return true
    }
  }
  return TargetComponent
}

const Target = createTargetComponent()
// This would not works as it should put to prototype.componentDidUpdate
// Target.componentDidUpdate = () => {
//   console.log('componentDidUpdate -- Replaced by Target')
//   return false
// }

// Change the method by change the prototype of the method
Target.prototype.componentDidUpdate = () => {
  console.log('componentDidUpdate -- finally changes here')
  return false
}

Target.componentDidUpdate()
new Target().componentDidUpdate()

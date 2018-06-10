let service = ()=> {
 console.log("real function called")
}
let test = () => {
  return {
    before: () => {
      console.log(`-----------begin time: -------------`);
    },
    after: () => {
      console.log(`=============time end:==============`);
    }
  }
}

let aop = (fn, proxy) => {
  proxy().before()
  fn()
  proxy().after()
}

aop(service,test);
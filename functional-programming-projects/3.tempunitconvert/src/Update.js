import * as R from 'ramda';

export const MSGS = {
  LEFT_VALUE_INPUT: 'LEFT_VALUE_INPUT',
  RIGHT_VALUE_INPUT: 'RIGHT_VALUE_INPUT',
  LEFT_UNIT_CHANGED: 'LEFT_UNIT_CHANGED',
  RIGHT_UNIT_CHANGED: 'RIGHT_UNIT_CHANGED',
};

export function leftValueInputMsg(leftValue) {
  return {
    type: MSGS.LEFT_VALUE_INPUT,
    leftValue
  }
}

export function rightValueInputMsg(rightValue) {
  return {
    type: MSGS.RIGHT_VALUE_INPUT,
    rightValue,
  };
}

export function leftUnitChangedMsg(leftUnit) {
  return {
    type: MSGS.LEFT_UNIT_CHANGED,
    leftUnit,
  };
}

export function rightUnitChangedMsg(rightUnit) {
  return {
    type: MSGS.RIGHT_UNIT_CHANGED,
    rightUnit,
  };
}

function update (msg, model) {
  switch (msg.type) {
    case MSGS.LEFT_VALUE_INPUT: {
      // if(msg.leftValue === '')
      //   return { ...model }
      // console.log( msg.leftValue )
      // // return { ...model, msg.leftValue || '' }
      // const leftValue = toInt(msg.leftValue);
      return {...model, leftValue: msg.leftValue }
    }
    case MSGS.RIGHT_VALUE_INPUT: {
      console.log( msg.rightValue )
      return {...model, rightValue: msg.rightValue}
    }
    case MSGS.LEFT_UNIT_CHANGED: {
      console.log( msg.leftUnit )
      return {...model, leftUnit: msg.leftUnit }
    }
    case MSGS.RIGHT_UNIT_CHANGED: {
      console.log( msg.rightUnit )
      return {...model, rightUnit: msg.rightUnit }
    }
  }
  return model;
}

export default update;

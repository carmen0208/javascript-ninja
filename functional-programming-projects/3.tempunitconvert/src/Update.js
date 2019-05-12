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
const toInt = R.pipe(parseInt, R.defaultTo(0))

function update (msg, model) {
  switch (msg.type) {
    case MSGS.LEFT_VALUE_INPUT: {
      const leftValue = toInt(msg.leftValue)
      return convert({...model, sourceLeft: true, leftValue })
    }
    case MSGS.RIGHT_VALUE_INPUT: {
      // console.log( msg.rightValue )
      const rightValue = toInt(msg.rightValue)
      return convert({...model, sourceLeft: false, rightValue})
    }
    case MSGS.LEFT_UNIT_CHANGED: {
      console.log( msg.leftUnit )
      return convert({...model, sourceLeft: true, leftUnit: msg.leftUnit })
    }
    case MSGS.RIGHT_UNIT_CHANGED: {
      console.log( msg.rightUnit )
      return convert({...model, sourceLeft: false, rightUnit: msg.rightUnit })
    }
  }
  return model;
}

function convert(model) {
  const {leftValue, leftUnit, rightValue, rightUnit } = model
  const [fromUnit, fromTemp, toUnit] =
    model.leftUnit
    ? [leftUnit, leftValue, rightUnit]
    : [rightUnit, rightValue, leftUnit]
  const otherValue = convertFromToTemp(fromUnit, toUnit, fromTemp)

  return model.sourceLeft
  ? { ...model, rightValue: otherValue }
  : { ...model, leftValue: otherValue };

}

function convertFromToTemp(fromUnit, toUnit, temp) {
  //R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
  return R.pathOr(R.identity, [fromUnit, toUnit], UnitConversions)(temp)
}

function FtoC(temp) {
  return 5 / 9 * (temp - 32);
}

function CtoF(temp) {
  return 9 / 5 * temp + 32;
}

function KtoC(temp) {
  return temp - 273.15;
}

function CtoK(temp) {
  return temp + 273.15;
}

const FtoK = R.pipe(FtoC, CtoK);
const KtoF = R.pipe(KtoC, CtoF);

const UnitConversions = {
  Celsius: {
    Fahrenheit: CtoF,
    Kelvin: CtoK,
  },
  Fahrenheit: {
    Celsius: FtoC,
    Kelvin: FtoK,
  },
  Kelvin: {
    Celsius: KtoC,
    Fahrenheit: KtoF,
  },
};

export default update;

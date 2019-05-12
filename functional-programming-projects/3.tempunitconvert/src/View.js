import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

const {
  div,
  h1,
  pre,
  input,
  select,
  option,
} = hh(h);

const UNITS = ['Fahrenheit', 'Celsius', 'Kelvin']

const unitOptions = (selectUnit) => {
  return R.map(
    unit => option({value: unit, selected: selectUnit ===unit}, unit),
    UNITS,
  )
}

function unitSection(dispatch, unit, value) {
  return div({ className: 'w-50 ma1'}, [
    input({
      type: 'text',
      className: 'db w-100 mv2 pa2 input-reset ba',
      value,
      oninput: e => console.log(e.target.value)
    }),
    select(
      {
        className: 'db w-100 pa2 ba input-reset br1 bg-white ba b--black',
        onchange: e=> console.log(e.target.value)
      },
      unitOptions(unit)
    )
  ])
}
function view(dispatch, model) {
  return div({ className: 'mw6 center' }, [
    h1({ className: 'f2 pv2 bb' }, 'Temperature Unit Converter'),
    div({ className: 'flex'}, [
      unitSection(
        dispatch,
        model.leftUnit,
        model.leftValue
      ),
      unitSection(
        dispatch,
        model.rightUnit,
        model.rightValue
      )
    ]),
    pre(JSON.stringify(model, null, 2)),
  ]);
}

export default view;

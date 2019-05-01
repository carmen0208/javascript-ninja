import hh from 'hyperscript-helpers';
import h from 'hyperscript'

const { pre, div, h1, button, form, label, input } = hh(h);

const initModel = {
  description: 'Breakfast',
  calories: 480,
  showForm: false,
  nextId: 0,
  editId: null,
  meals: [],
}

function FieldSet(labelText, inputValue, oninput) {
  return div([
    label({className: 'db mb1'}, labelText),
    input({
      className: 'pa2 input-reset ba w-100 mb2',
      type: 'text',
      value: inputValue,
      oninput
    })
  ])
}

function buttonSet() {
  return div([
    button({
      className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
      type: 'submit',
    },
    'Save',
    ),
    button({
      className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
      type: 'button',
      onclick: () => console.log('canceled')
    },
    'Cancel',
    ),
  ])
}

function formView(model) {
  const { description, calories} = model;
  return form(
    {
      className: 'v-100 mv2',
      onsubmit: e=> console.log('submited')
    },
    [
      FieldSet('Meal', description,
        e => console.log(e.target.value)
      ),
      FieldSet('Calories', calories || '',
        e => console.log(e.target.value)
      ),
      buttonSet()
    ]
  )
}

function view(model) {
  const div_dom = div({className: 'mv6 center',}, [
    h1({className: 'f2 pv2 bb' }, 'Calorie Counter'),
    formView(model),
    pre(JSON.stringify(model, null, 2))
  ]);
  console.log(div_dom)
  console.log(div_dom)
  return div_dom;
}

const node = document.getElementById('app')
node.appendChild(view(initModel))
import hh from 'hyperscript-helpers';
import { h, diff, patch } from 'virtual-dom';
import createElement from 'virtual-dom/create-element';

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

function buttonSet(dispatch) {
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

function formView(dispatch, model) {
  const { description, calories, showForm} = model;
  if (showForm) {
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
  return button(
    {
      className: 'f3 pv2 ph3 bg-blue white bn',
      onclick: () => dispatch(showFormMsg(true)),
    },
    'Add Meal',
  )
}

function view(dispatch, model) {
  const div_dom = div({className: 'mv6 center',}, [
    h1({className: 'f2 pv2 bb' }, 'Calorie Counter'),
    formView(dispatch, model),
    pre(JSON.stringify(model, null, 2))
  ]);
  console.log(div_dom)
  console.log(div_dom)
  return div_dom;
}

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
};

function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm,
  };
}
function update(msg, model) {
  switch (msg.type) {
    case MSGS.SHOW_FORM: {
      const { showForm } = msg;
      return { ...model, showForm, description: '', calories: 0 };
    }
  }
  return model
}

function app(initModel, update, view, node) {
  let model = initModel;
  let currentView = view(dispatch, model);
  let rootNode = createElement(currentView);
  node.appendChild(rootNode)
  node.appendChild(view(model))
  function dispatch(msg) {
    model = update(msg, model)
    const updatedView = view(dispatch, model)
    const patches = diff(currentView, updatedView)
    rootNode = patch(rootNode, patches)
    currentView = updatedView
  }
}

const node = document.getElementById('app')
app(initModel, update, view, node)

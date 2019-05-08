import * as R from 'ramda'
import { parse } from 'url';

const MSGS = {
  SHOW_FORM: 'SHOW_FORM',
  MEAL_INPUT: 'MEAL_INPUT',
  CALORIES_INPUT: 'CALORIES_INPUT',
  SAVE_MEAL: 'SAVE_MEAL',
  DELETE_MEAL: 'DELETE_MEAL',
  EDIT_MEAL: 'EDIT_MEAL'
};

export function showFormMsg(showForm) {
  return {
    type: MSGS.SHOW_FORM,
    showForm,
  };
}

export function mealInputMsg(description) {
  return {
    type: MSGS.MEAL_INPUT,
    description
  }
}

export function editMealMsg(id) {
  return {
    type: MSGS.EDIT_MEAL,
    editId: id,
  }
}

export function deleteMealMsg(id) {
  return {
    type: MSGS.DELETE_MEAL,
    id
  }
}
export function caloriesInputMsg(calories) {
  return {
    type: MSGS.CALORIES_INPUT,
    calories
  }
}

export const saveMealMsg =  { type: MSGS.SAVE_MEAL }

function update(msg, model) {
  switch (msg.type) {
    case MSGS.SHOW_FORM: {
      const { showForm } = msg;
      return { ...model, showForm, description: '', calories: 0 };
    }
    case MSGS.MEAL_INPUT: {
      const { description } = msg;
      return { ...model, description }
    }
    case MSGS.CALORIES_INPUT: {
      // const { calories } = msg
      const calories = R.pipe(
        parseInt,
        R.defaultTo(0)
      )(msg.calories)
      return { ...model, calories }
    }
    case MSGS.SAVE_MEAL: {
      const { editId } = model
      const updatedModel = editId !== null ?
          edit(msg, model) :
          add(msg, model)
      return updatedModel
    }
    case MSGS.DELETE_MEAL: {
      const meals = R.filter(
      meal => meal.id !== msg.id,
      model.meals)
      console.log(meals)
      return {...model, meals}
    }
    case MSGS.EDIT_MEAL: {
      const {editId} = msg
      const meal = R.find(
        meal => meal.id === editId,
        model.meals
      )
      const { description, calories } = meal;
      return {
        ...model,
        description,
        calories,
        editId,
        showForm: true
      }
    }
  }
  return model
}

function add(msg, model) {
  const {nextId, description, calories } = model
  const meal = {id: nextId, description, calories }
  const meals = [...model.meals, meal]
  return {
    ...model,
    meals,
    nextId: nextId + 1,
    description: '',
    calories: 0,
    showForm: false
  }
}

function edit( msg, model) {
  const {description, calories, editId } = model
  const meals = R.map(
      meal => {
        if( meal.id === editId) {
          return  { ...meal, description, calories }
        }
        return meal
      },
      model.meals
  )
  return {
    ...model,
    meals,
    description: '',
    calories: 0,
    showForm: false,
    editId: null
  }
}
export default update

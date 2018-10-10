// ==================
// Global actions 
// ==================

// Generates a unique random string
import nanoid from 'nanoid'

// Sets the new item input value in the state
export const setInputValue = (state, ev) => ({
  ...state,
  inputValue: ev.target.value
})

// Toggles the state viewer
export const toggleStateViewer = (state) => ({
  ...state,
  stateIsShown: !state.stateIsShown
})

// Adds a new item in the array
// and resets the input.
export const addItem = (state, ev) => {
  ev.preventDefault();
  return {
    ...state,
    inputValue: '',
    items: state.items.concat({
      id: nanoid(),
      value: state.inputValue,
      done: false,
      editing: false
    })
  }
}

// Updates the "value" attribute of an item by ID
export const updateItem = (state, id, ev) => ({
  ...state,
  items:  state.items.map(item => 
    id === item.id 
      ? ({...item, value: ev.target.value})
      : item
  )
})

// Inverts the "done" attribute of an item by ID
export const toggleItem = (state, id) => ({
  ...state,
  items:  state.items.map(item => 
    id === item.id 
      ? ({...item, done: !item.done})
      : item
  )
})

// Inverts the "editing" attribute of an item by ID,
// and sets to false for all other items
export const toggleItemEditing = (state, id, ev) => {
  ev.preventDefault();
  return {
    ...state,
    items:  state.items.map(item => 
      id === item.id 
        ? ({...item, editing: !item.editing})
        : ({...item, editing: false})
    )
  }
}

// Removes an item in the array by ID
export const deleteItem = (state, id) => ({
  ...state,
  items: state.items.filter(item => id !== item.id)
})

// Removes all "done" items
export const clearCheckedItems = (state) => ({
  ...state,
  items: state.items.filter(item => !item.done)
})

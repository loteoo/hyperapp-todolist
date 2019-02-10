// ==================
// Global actions
// ==================

// Generates a unique random string
import nanoid from 'nanoid'

// Sets the new item input value in the state
export const SetInput = (state, ev) => ({
  ...state,
  input: ev.target.value
})

// Toggle the state viewer
export const ToggleStateViewer = (state) => ({
  ...state,
  showState: !state.showState
})

// Adds a new item in the array
// and resets the input.
export const AddItem = (state, ev) => {
  ev.preventDefault()
  return {
    ...state,
    input: '',
    items: state.items.concat({
      id: nanoid(),
      value: state.input,
      done: false,
      editing: false
    })
  }
}

// Updates the "value" attribute of an item by ID
export const UpdateItem = (state, id, ev) => ({
  ...state,
  items: state.items.map(item =>
    id === item.id
      ? ({...item, value: ev.target.value})
      : item
  )
})

// Inverts the "done" attribute of an item by ID
export const ToggleItem = (state, id) => ({
  ...state,
  items: state.items.map(item =>
    id === item.id
      ? ({...item, done: !item.done})
      : item
  )
})

// Inverts the "editing" attribute of an item by ID,
// and sets to false for all other items
export const ToggleItemEditing = (state, id, ev) => {
  ev.preventDefault()
  return {
    ...state,
    items: state.items.map(item =>
      id === item.id
        ? ({...item, editing: !item.editing})
        : ({...item, editing: false})
    )
  }
}

// Removes an item in the array by ID
export const DeleteItem = (state, id) => ({
  ...state,
  items: state.items.filter(item => id !== item.id)
})

// Removes all "done" items
export const ClearCheckedItems = (state) => ({
  ...state,
  items: state.items.filter(item => !item.done)
})

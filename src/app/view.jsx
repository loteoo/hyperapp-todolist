// vDOM builder
import {h} from 'hyperapp'

// Bundle css for this view
import 'sanitize.css'
import './style.css'

// Import icon components
import {Close, Circle, CheckedCircle, Plus, Check, Github} from './icons.js'

// Import actions
import {
  SetInput,
  AddItem,
  UpdateItem,
  ToggleItem,
  DeleteItem,
  ToggleStateViewer,
  ToggleItemEditing,
  ClearCheckedItems
} from './actions'

// Root application view
export const view = state => (
  <div class="container">
    <div class="card">
      <div class="left">
        <h1>Hyperapp to-do list</h1>
        <p>Built with <a href="https://github.com/jorgebucaran/hyperapp" target="_blank">Hyperapp 2.0</a></p>
        <p><a href="https://github.com/loteoo/hyperapp-todolist" target="_blank"><Github /> Source code</a></p>
      </div>
      <div className="right">
        <div class="todo-list">
          <form class="new-item-form" onsubmit={AddItem} method="post">
            <input type="text" placeholder="Type something here..." value={state.input} oninput={SetInput} required />
            <button type="submit"><Plus /></button>
          </form>
          <h4>{state.items.length} items</h4>
          <ul class="list">
            {state.items.map(item => <Item {...item} />)}
          </ul>
        </div>
        <div class="info">
          <span>Click to edit.</span>
          <a onclick={[ClearCheckedItems]}>Clear checked items</a>
        </div>
      </div>
    </div>
    <div class="state-viewer">
      <a onclick={ToggleStateViewer}>{state.showState ? 'Hide state' : 'Show app state'}</a>
      {state.showState ? <pre>{JSON.stringify(state, null, 2)}</pre> : null}
    </div>
  </div>
)

// Item component
const Item = ({id, value, done, editing}) => (
  <li class="item" key={id}>
    {
      editing
        ? ( // If the item if currently being edited
          <form class="inner" method="post" onsubmit={[ToggleItemEditing, id]}>
            <input type="text" value={value} onCreate={el => el.focus()} oninput={[UpdateItem, id]} required />
            <button class="confirm">{<Check />}</button>
          </form>
        )
        : ( // If the item is NOT being edited (default)
          <div class={'inner' + (done ? ' done' : '')}>
            <button class="check" onclick={[ToggleItem, id]}>{done ? <CheckedCircle /> : <Circle />}</button>
            <div class="name" onclick={[ToggleItemEditing, id]}>
              {
                done
                  ? <strike>{value}</strike>
                  : <span>{value}</span>
              }
            </div>
            <button class="delete" onclick={[DeleteItem, id]}><Close /></button>
          </div>
        )
    }
  </li>
)

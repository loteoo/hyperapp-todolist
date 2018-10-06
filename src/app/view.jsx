// Bundle css for this view
import 'sanitize.css'
import './style.css'

 // Hyperapp v2
import {h} from '../../hyperapp.js'

// import actions
import {setInputValue, addItem, updateItem, toggleItem, deleteItem, toggleStateViewer, toggleItemEditing} from './actions'

// Import icon components
import {Close, Circle, CheckedCircle, Plus, Check} from './icons.js'

// Root application view
export const view = state => (
  <div class="container">
    <div class="card">
      <div class="info">
        <h1>Hyperapp Todolist</h1>
        <p>Built with <a href="https://github.com/jorgebucaran/hyperapp" target="_blank">Hyperapp 2.0</a></p>
        <p><a href="https://github.com/loteoo/hyperapp-todolist" target="_blank">Source code</a></p>
      </div>
      <div class="todo-list">
        <form class="new-item-form" onsubmit={addItem} method="post">
          <input type="text" placeholder="Type something here..." value={state.inputValue} oninput={setInputValue} required />
          <button type="submit"><Plus /></button>
        </form>
        <h4>{state.items.length} items</h4>
        <ul class="list">
          {state.items.map(item => <Item {...item} />)}
        </ul>
      </div>
    </div>
    <div class="state-viewer">
      <button onclick={toggleStateViewer}>{state.stateIsShown ? 'Hide state' : 'Show app state'}</button>
      {state.stateIsShown ? <pre>{JSON.stringify(state, null, 2)}</pre> : null}
    </div>
  </div>
)

// Item component
const Item = ({id, value, done, editing}) => (
  <li class="item" key={id}>
    {
      editing
      ? (
        <form class="inner" method="post" onsubmit={[toggleItemEditing, id]}>
          <input type="text" value={value} onCreate={el => el.focus()} oninput={[updateItem, id]} required />
          <button class="confirm"><Check /></button>
        </form>
      )
      : (
        <div class="inner">
          <button class="check" onclick={[toggleItem, id]}>{done ? <CheckedCircle /> : <Circle />}</button>
          <div class="name" ondblclick={[toggleItemEditing, id]}>
            {
              done
              ? <strike>{value}</strike>
              : <span>{value}</span>
            }
          </div>
          <button class="delete" onclick={[deleteItem, id]}><Close /></button>
        </div>
      )
    }
  </li>
)



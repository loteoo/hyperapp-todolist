// Bundle css for this view
import 'sanitize.css'
import './style.css'

import {h} from '../lib/hyperappv2.js'
import {
  setInputValue,
  addItem,
  updateItem,
  toggleItem,
  deleteItem,
  toggleStateViewer,
  toggleItemEditing
} from './actions'

import {Close, Circle, CheckedCircle, Plus, Check} from './icons.js'

// Root view
export const view = state => (
  <div class="app">

    <div class="card">
      <header>
        <h1>Hyperapp Todolist</h1>
        <p>Hyperapp 2.0 todolist app.</p>
      </header>

      <main>

        
        <form class="new-item-form" onsubmit={addItem} method="post">
          <input type="text" value={state.inputValue} oninput={setInputValue} />
          <button type="submit" disabled={!state.inputValue}><Plus /></button>
        </form>
        
        <h4>{state.items.length} items</h4>
        <ul class="list">
          {state.items.map(item => <Item {...item} />)}
        </ul>
        
        
      </main>
    </div>

    <footer>
      <div class="state-viewer">
        <button onclick={toggleStateViewer}>{state.stateIsShown ? 'Hide state' : 'Show app state'}</button>
        {state.stateIsShown ? <pre>{JSON.stringify(state, null, 2)}</pre> : null}
      </div>
    </footer>
  </div>
)





// Item component
const Item = ({id, value, done, editing}) => (
  <li class="item" key={id}>
    {
      editing
      ? (
        <form class="inner" method="post" onsubmit={[toggleItemEditing, id]}>
          <input type="text" value={value} oninput={[updateItem, id]} />
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



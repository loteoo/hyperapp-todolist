  // vDOM builder
  import {h} from 'hyperapp'

 // Bundle css for this view
 import './style.css'

// Import actions
import {setInputValue, addItem, updateItem, toggleItem, deleteItem, toggleStateViewer, toggleItemEditing, clearCheckedItems} from './actions'

// Root application view
export const view = state => (
  <div class="container">
    <div class="card">
      <div class="left">
        <h1>Hyperapp to-do list</h1>
        <p>Built with <a href="https://github.com/jorgebucaran/hyperapp" target="_blank">Hyperapp 2.0</a></p>
        <p><a href="https://github.com/loteoo/hyperapp-todolist" target="_blank">{'<Github />'} Source code</a></p>
      </div>
      <div className="right">
        <div class="todo-list">
          <form class="new-item-form" onsubmit={addItem} method="post">
            <input type="text" placeholder="Type something here..." value={state.inputValue} oninput={setInputValue} required />
            <button type="submit">{'<Plus />'}</button>
          </form>
          <h4>{state.items.length} items</h4>
          <ul class="list">
            {state.items.map(item => <Item {...item} />)}
          </ul>
        </div>
        <div class="info">
          <span>Click to edit.</span>
          <a onclick={[clearCheckedItems]}>Clear checked items</a>
        </div>
      </div>
    </div>
    <div class="state-viewer">
      <a onclick={toggleStateViewer}>{state.stateIsShown ? 'Hide state' : 'Show app state'}</a>
      {state.stateIsShown ? <pre>{JSON.stringify(state, null, 2)}</pre> : null}
    </div>
  </div>
)

// Item component
const Item = ({id, value, done, editing}) => (
  <li class="item" key={id}>
    {
      editing
      ? ( // If the item if currently being edited
        <form class="inner" method="post" onsubmit={[toggleItemEditing, id]}>
          <input type="text" value={value} onCreate={el => el.focus()} oninput={[updateItem, id]} required />
          <button class="confirm">{'<Check />'}</button>
        </form>
      )
      : ( // If the item if NOT being edited
        <div class={'inner' + (done ? ' done' : '')}>
          <button class="check" onclick={[toggleItem, id]}>{done ? '<CheckedCircle />' : '<Circle />'}</button>
          <div class="name" onclick={[toggleItemEditing, id]}>
            {
              done
              ? <strike>{value}</strike>
              : <span>{value}</span>
            }
          </div>
          <button class="delete" onclick={[deleteItem, id]}>{"rola('../assets/icons/close.svg')"}</button>
        </div>
      )
    }
  </li>
)



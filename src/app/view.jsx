// Bundle css for this view
import './evie.css'

import {h} from '../lib/hyperappv2.js'
import {setInputValue, addItem, updateItem, toggleItem, deleteItem} from './actions'

// Root view
export const view = state => (
  <div>
    <header class="page__header">
      <div class="hero__overlay hero__overlay--gradient"></div>
      <div class="page__header__inner">
        <div class="container">
          <div class="page__header__content">
            <div class="page__header__content__inner" id="navConverter">
              <h1 class="page__header__title">Hyperapp 2.0!</h1>
              <p class="page__header__text">1 kB JavaScript micro-framework for building declarative web applications</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main>
    <div class="landing__section">
      <div class="container">
        <h2>Todo items:</h2>
      </div>
    </div>
    <div class="expanded landing__section">
      <div class="container">
          <ul>
            {state.items.map(item => <Item {...item} />)}
          </ul>
          <b>Total: {state.items.length}</b>
          <br/>
          <input type="text" value={state.inputValue} oninput={setInputValue} />
          <button onclick={addItem} disabled={!state.inputValue}>New item</button>
      </div>
    </div>

    </main>
    <h4>State: </h4>
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </div>
)


// Item component
const Item = ({id, value, done}) => (
  <li key={id}>
    <input type="text" value={value} oninput={[updateItem, id]} disabled={done} />
    <button onclick={[deleteItem, id]}>Delete</button>
    <button onclick={[toggleItem, id]}>{done ? 'Uncheck' : 'Check'}</button>
  </li>
)
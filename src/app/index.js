import {app} from 'hyperapp'
import {init} from './init'
import {view} from './view'

// Initialize the app
app({
  init: {...init, ...JSON.parse(window.localStorage.getItem('hyperapp-todolist'))},
  view,
  subscriptions: state => window.localStorage.setItem('hyperapp-todolist', JSON.stringify(state)),
  container: document.body
})

// Register service worker for offline support
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../service-worker.js')
}

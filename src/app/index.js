import {app} from 'hyperapp'
import {init} from './init'
import {view} from './view'

// Initialize the app
app({init, view, container: document.body})

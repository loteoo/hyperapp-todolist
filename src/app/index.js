import {app} from '../../hyperapp.js' // Hyperapp v2
import {init} from './init'
import {view} from './view'

// Initialize the app
app({init, view, container: document.body})

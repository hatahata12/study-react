import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todo from './reducers'
import App from './components/App'
import * as actions from './actions'

let store = createStore(todo, {todos: []})

store.dispatch(actions.addTodo('Hello React!'))
store.dispatch(actions.addTodo('Hello Redux!'))
store.dispatch(actions.addTodo('Hello Redux!!!'))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container')
)
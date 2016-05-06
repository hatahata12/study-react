import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

const initialState = {
  todos: [
    {
      text: 'test',
      completed: false
    }
  ]
}

const store = createStore(todoApp, initialState)

store.subscribe(() => console.log(store.getState()))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container')
)
import { setVisibilityFilter } from '../src/actions'
import { createStore } from 'redux'
import todoApp from '../src/reducers'

const store = createStore(todoApp)

console.log(store.getState())
store.dispatch(setVisibilityFilter('SHOW_COMPLETED'))
console.log(store.getState())

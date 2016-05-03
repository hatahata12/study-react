import { createStore } from 'redux'

// Action Creator
function addTodo(text) {
  return { type: 'ADD_tODO', text }
}

function completeTodo(id) {
  return { type: 'COMPLETE_TODO', id }
}

function setVisibilityFilter(filter) {
  return { type: 'SET_VISIBILITY_FILTER', filter }
}

// Reducer
function todoApp(state, action) {
  switch(action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: [
          ...state.tods,
          {
            text: action.text,
            completed: false
          }
        ]
      })

    case 'COMPLETE_TODO':
      return state

    case 'SET_VISIBILITY_FILTER':
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })

    default:
      return state
  }
}

const initialState = {
  todos: [
    {
      text: 'WEB*DB PRESSを買う',
      completed: true
    },
    {
      text: 'WEB*DB PRESSを読む',
      completed: true
    }
  ],
  visibilityFilter: 'SHOW_ALL'
}

const store = createStore(todoApp, initialState)
store.subscribe(() => console.log(store.getState()))

store.dispatch(addTodo('電球を替える'))
store.dispatch(addTodo('公共料金を払う'))
store.dispatch(completeTodo(2))
store.dispatch(setVisibilityFilter('SHOW_COMPLETED'))
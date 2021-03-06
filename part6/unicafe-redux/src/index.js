import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducer'
import App from './App'

const store = createStore(reducer)

store.dispatch({
  
})
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, 
document.getElementById('root'))


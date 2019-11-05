
import React from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import ReactDOM from 'react-dom'
import App from './App'

const store = createStore(
    combineReducers({
        notification: notificationReducer,
        blogs: blogsReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const renderApp = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    )
}

renderApp()
store.subscribe(renderApp)

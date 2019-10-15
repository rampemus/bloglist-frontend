
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import ReactDOM from 'react-dom'
import App from './App'

const store = createStore(notificationReducer)

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

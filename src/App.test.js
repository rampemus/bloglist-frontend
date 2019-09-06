import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'
jest.mock('./services/login')
jest.mock('./services/blogs')
import App from './App'

afterEach(cleanup)

let localStorageItems = {}

const localStorageMock = {
    setItem: (key, item) => {
        localStorageItems[key] = item
    },
    getItem: key => localStorageItems[key],
    clear: localStorageItems = {}
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })


test('renders content for login', () => {

    const component = render(
        <App/>
    )

    expect(component.container).toHaveTextContent('log in to application')

})

test('renders blogs for user', async() => {

    const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogsUser', JSON.stringify(user))

    const component = render(
        <App/>
    )

    await waitForElement(() => component.container.querySelector('.BlogTitle'))

    expect(component.container).toHaveTextContent('TDD harms architecture')

})

// const username = component.container.querySelector('#username')
// const password = comopnent.container.querySelector('#password')

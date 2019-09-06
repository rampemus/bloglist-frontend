import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
    const blog = {
        title: 'Testing is fun',
        author: 'Langste Sting',
        likes: 4
    }

    const component = render(
        <SimpleBlog blog={blog}/>
    )

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.likes)
})

test('clicking twice calls click handler twice', () => {
    const blog = {
        title: 'How to get two likes more',
        author: 'Mike Li',
        likes: 3
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})

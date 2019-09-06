import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

const blog = {
    likes: 15,
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    user: {
        blogs: [
            '5d5d6679a1eeeafce5c1044a',
            '5d6f9b5cf101cc21cdd30e7d',
            '5d6f9c8df101cc21cdd30e7e'
        ],
        username: 'rampemus',
        name: 'Pasi Toivanen',
        id: '5d5d2aaa6c3108e7afe2cd1e'
    },
    __v: 0,
    id: '5d5d6679a1eeeafce5c1044a'
}

test('renders minimal content', () => {

    const mockSetNotification = jest.fn()
    const mockUpdateBlogs = jest.fn()

    const component = render(
        <Blog
            blog={blog}
            ownedByUser={true}
            setNotification={mockSetNotification}
            updateBlogs={mockUpdateBlogs}
            key={0}
        />
    )

    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)

    expect(component.container).not.toHaveTextContent(blog.user.name)
    expect(component.container).not.toHaveTextContent('like')
    expect(component.container).not.toHaveTextContent(blog.url)

})

//TODO:Tee oman sovelluksesi komponentille Blog testit, jotka varmistavat, että oletusarvoisesti blogista on näkyvissä ainoastaan nimi ja kirjoittaja, ja että klikkaamalla niitä saadaan näkyviin myös muut osat blogin tiedoista.

test('expands when title is clicked', () => {
    const mockSetNotification = jest.fn()
    const mockUpdateBlogs = jest.fn()

    const component = render(
        <Blog
            blog={blog}
            ownedByUser={true}
            setNotification={mockSetNotification}
            updateBlogs={mockUpdateBlogs}
            key={0}
        />
    )
    const title = component.container.querySelector('.BlogTitle')
    fireEvent.click(title)
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.user.name)
    expect(component.container).toHaveTextContent('like')
    expect(component.container).toHaveTextContent(blog.url)
})

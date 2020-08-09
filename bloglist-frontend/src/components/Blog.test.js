import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import {prettyDOM} from '@testing-library/dom'

test('renders blogs', () => {
    const blog = {
        title: 'Historical Catergories as Transformative Justice',
        author: 'Cao N H Hoang',
        url: 'https:\\www.ecyclo.com',
        likes: 67
    }

    const mockHandler = jest.fn()
    const component = render(
        <Blog blog={blog} deletePost={mockHandler} />
    )


    expect(component.container).not.toHaveTextContent('likes 67')
    expect(component.container).not.toHaveTextContent('https:\\www.ecyclo.com')

    const button = component.getByText('view')
    fireEvent.click(button)
    
    expect(component.container).toHaveTextContent('https:\\www.ecyclo.com')
    expect(component.container).toHaveTextContent('likes 67')

    const delButton = component.getByText('delete')
    fireEvent.click(delButton)
    fireEvent.click(delButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
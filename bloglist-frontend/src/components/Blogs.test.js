import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blogs from './Blogs'

test('<Blogs /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()

    const component = render(
        <Blogs createBlog={createBlog} />
    )

    const title = component.container.querySelector('.title')
    const author= component.container.querySelector('.author')
    const url = component.container.querySelector('.url')
    const form = component.container.querySelector('.formDiv')

    fireEvent.change(title, { 
        target: { value: 'testing of forms could be easier' } 
    })
    fireEvent.change(author, { 
        target: { value: 'CNHH' } 
    })
    fireEvent.change(url, { 
        target: { value: 'www.www.www' } 
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
    expect(createBlog.mock.calls[0][0].author).toBe('CNHH')
    expect(createBlog.mock.calls[0][0].url).toBe('www.www.www')
   
})
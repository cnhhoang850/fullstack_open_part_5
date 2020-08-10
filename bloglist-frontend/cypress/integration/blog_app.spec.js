describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Cao N Huy Hoang',
            username: 'cnhhoang850',
            password: 'Hoangpro123'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    
    it('front page can be opened', function() {
      cy.contains('Blog')
    })

    describe('logging in', function() {
        it('succeeds with correcct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('cnhhoang850')
            cy.get('#password').type('Hoangpro123')
            cy.get('#login-button').click()

            cy.contains('cnhhoang850 logged in')
        })

        it('login fials with wrong password', function () {
            cy.contains('login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
    
            cy.contains('incorrect')
    
            cy.get('.error')
                .should('contain', 'incorrect')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
            cy.get('html').should('not.contain', 'cnhhoang850 logged in')
        })
    })

    describe('when logged in', function() {
        beforeEach(function() {
        cy.login({username: 'cnhhoang850', password: 'Hoangpro123'})
        })

        it('can create new blogs', function() {
            cy.contains('new blog').click()
            cy.get('.title').type('Justice as analogy for power')
            cy.get('.author').type('Michel Foucault')
            cy.get('.url').type('www.com.com')
            cy.get('#create-button').click()

            cy.contains('Justice as analogy for power')
        })

        describe('and a blog exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'Transformative Justice as Injustice',
                    author: 'Cao N Huy Hoang',
                    url: 'www.com.com'
                })
            })

            it('it can be liked', function () {
                cy.contains('view').click()
                cy.contains('like').click()
                cy.contains('likes 1')
            })

            it('can delete blog post', function() {
                cy.contains('view').click() 
                cy.contains('delete').click()
                cy.get('.error')
                .should('contain', 'deleted')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
                cy.get('.blog').should('not.contain','Transformative Justice as Injustice')
            })  
        })

        describe('when multiple blogs exist', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'Transformative Justice as Injustice',
                    author: 'Cao N Huy Hoang',
                    url: 'www.com.com',
                    likes: 10
                })
                cy.createBlog({
                    title: 'Transformative Justice as Injustice2',
                    author: 'Cao N Huy Hoang',
                    url: 'www.com.com2',
                    likes: 100
                })
                cy.createBlog({
                    title: 'Transformative Justice as Injustice3',
                    author: 'Cao N Huy Hoang',
                    url: 'www.com.com3',
                    likes: 1000
                })
                cy.createBlog({
                    title: 'Transformative Justice as Injustice4',
                    author: 'Cao N Huy Hoang',
                    url: 'www.com.com4',
                    likes: 10000
                })
            })

            it('blogs should be odered descendingly', function() {
                cy.get('.blog').then( blogs => {
                    cy.wrap(blogs[0]).should('contain', 'Transformative Justice as Injustice4' )
                    cy.wrap(blogs[1]).should('contain', 'Transformative Justice as Injustice3' )
                    cy.wrap(blogs[2]).should('contain', 'Transformative Justice as Injustice2' )
                    cy.wrap(blogs[3]).should('contain', 'Transformative Justice as Injustice' )
                })
            })
        })
    })
  })
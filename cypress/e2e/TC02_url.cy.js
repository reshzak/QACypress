describe('Create and mark-unmark as fav- React', function(){
    it('Sign in', function(){
        cy.visit('https://react-redux.realworld.io/#login')
        //check title
        cy.title().should('eq', 'Conduit')
        //check the protocol
        cy.location('protocol').should('eq', 'https:')
        cy.get('input[type="email"]').type('reshzak123@gmail.com')
        cy.get('input[type="password"]').type('abc')
        cy.get('.btn').contains('Sign in').click()
        cy.contains('Your Feed',{timeout:10000}).should('be.visible')
    })
    it('Create Post', function(){
        cy.contains('New Post').click()
        cy.hash().should('include','#/editor') //cy.location('hash').should('include', '#/editor')
        cy.get('input[placeholder="Article Title"]').type('First Test Post')
        cy.get('input[placeholder="What\'s this article about?"]').type("Post Title")
        cy.get('textarea[placeholder="Write your article (in markdown)"]').type("Article body goes here.")
        cy.contains('Publish Article').click()
        //check if the url has a specified substring in it:
        cy.url().should('include','article')
    })
    it('Mark-unmark fav',function(){
        cy.get('.nav-link').contains('reshzak').click()
        cy.contains('My Articles').should('be.visible')
        cy.get('.ion-heart').click()
        cy.contains('Favorited Articles').click()
        cy.url().should('include', 'favorites')
        cy.get('.ion-heart').click()
        //page reload
        cy.reload()
        cy.contains('No articles are here... yet').should('be.visible')
        //browser back button
        cy.go('back')  //cy.go(-1)
    })
})
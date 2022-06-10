

describe('Create and mark-unmark as fav- React', function () {
    it('Sign in', function () {
        cy.visit('https://react-redux.realworld.io/#login')
        //check title
        cy.title().should('eq', 'Conduit')
        //check the protocol
        cy.location('protocol').should('eq', 'https:')
        //get form element an dsearch within it:
        cy.get('form').within(($form) => {
            cy.get('input[type="email"]').type('reshzak123@gmail.com')
            cy.get('input[type="password"]').type('abc')
            cy.root().submit()

        })
        cy.contains('Your Feed', { timeout: 10000 }).should('be.visible')
    })
    it('Create Post', function () {
        //Get the child element of a parent:
        cy.get('ul.navbar-nav').children().contains("New Post").click()
        cy.hash().should('include', '#/editor') //cy.location('hash').should('include', '#/editor')
        cy.get('form').within(($form) => {
            //get first input form element
            cy.get('input').first().type('First Test Post')
            //specify second element of the form field using its index - eq(1)
            cy.get('input').eq(1).type("Post Title")
            // //get last input form element
            cy.get('textarea').last().type("Article body goes here.")
            cy.contains('Publish Article').click()

        })
        //check if the url has a specified substring in it:
        cy.url().should('include', 'article')
    })

    it('Mark-unmark fav', function () {
        cy.get('ul.navbar-nav').children().contains("New Post").click()
        cy.get('.nav-link').contains('reshzak').click()
        cy.contains('My Articles').should('be.visible')
        cy.get('.ion-heart').first().click()
        cy.contains('Favorited Articles').click()
        cy.url().should('include', 'favorites')
        cy.get('.btn-primary').first().then(($favv)=>{
            const favCount = $favv.text()
            expect(parseInt(favCount)).to.eq(1)
        }).click()
        //page reload
        cy.reload()
        cy.contains('No articles are here... yet').should('be.visible')
        //browser back button
        cy.go('back')  //cy.go(-1)
    })
})
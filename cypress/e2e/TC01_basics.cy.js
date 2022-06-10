describe('Login', function(){
    it('Sign in', function(){
        cy.visit('https://www.commbank.com.au/home-loans/home-loan-calculators-and-tools.html')
        cy.get('#calculators > .column-combo > .content-section > .item-section > :nth-child(2) > .item-inner > :nth-child(3) > .button_tertiary').click()
        cy.get('#amount').clear().type('650000')
        cy.get('#productId').select('3')
        cy.get('#submit').click()
        cy.get('.col-xs-12').should('be.visible').contains('Your principal and interest repayments would be $2,952 per month')
    })

  })
  
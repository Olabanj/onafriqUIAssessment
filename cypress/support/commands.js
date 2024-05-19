let sel;
before(()=>{
    cy.fixture('credentials').then((data)=>{
        sel = data
    })
})

// 1. Visit the website and click on Sign-In
 Cypress.Commands.add('loginButton', () => { 
       cy.get("a[href='/login']").click()

  })

  // 2. Sign-In using the provided credentials
Cypress.Commands.add('SignIn', ()=>{
        cy.get('input[data-qa="login-email"]').type(sel.email);
        cy.get('input[data-qa="login-password"]').type(sel.Password);
        cy.get('button[data-qa="login-button"]').click();
})

//3. Fetch and sort items by price under FEATURED ITEMS
Cypress.Commands.add('FetchItem', ()=>{
cy.contains('Features Items').scrollIntoView();
cy.get('.features_items > .title').invoke('text').then((txt) => {
 expect(txt).to.equal('Features Items');
});

let items = [];
cy.get('.features_items .col-sm-4').each(($el) => {
const label = $el.find('h2').text();
const price = parseFloat($el.find('.price').text().replace('$', ''));
items.push({ label, price });
}).then(() => {
  items.sort((a, b) => a.price - b.price);
  cy.log('Sorted Items by Price:');
 
 
})
})

// 4. Scroll Up - Navigate to Women >> Tops >> Women-Tops
Cypress.Commands.add('NavigateWomenTops', ()=>{
cy.get('a').contains('Women').trigger('mouseover');
cy.get('a').contains('Tops').click({force:true});
cy.get('.title').should("exist").and("be.visible")
cy.get(".title.text-center").invoke('text').then((txt) => {
    expect(txt).to.equal('Women - Tops Products');
  });
})

// 5. Select Fancy Green Top and Summer White Top, then add to cart
Cypress.Commands.add('selectFancyGreenAndSummerWhite', ()=>{
       cy.contains('Fancy Green Top').scrollIntoView().click();
       cy.get(':nth-child(7) > .product-image-wrapper > .single-products > .productinfo > .btn').should("exist").and("be.visible").click();
       cy.get(".btn.btn-success.close-modal.btn-block").should("exist").and("be.visible").click();
       cy.contains('Summer White Top').scrollIntoView().click();
       cy.get(':nth-child(5) > .product-image-wrapper > .single-products > .productinfo > .btn').should("exist").and("be.visible").click();
       cy.get("div[id='cartModal'] p:nth-child(1)").invoke('text').then((txt) => {
           expect(txt).to.equal('Your product has been added to cart.');
         });
       cy.get("body > section:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > p:nth-child(2) > a:nth-child(1) > u:nth-child(1)").click();
        })

        // 6. Proceed to checkout and place order
 Cypress.Commands.add('ProceedCheckoutOrder', ()=>{
        cy.get('.btn.btn-default.check_out').click();
        cy.get("textarea[name='message']").type('Order placed.');
        cy.get(".btn.btn-default.check_out").click();
        })
     
        // Enter card details
Cypress.Commands.add('EnterCardDetails', ()=>{
          cy.get('input[name="name_on_card"]').type('Test Card');
          cy.get('input[name="card_number"]').type('4100 0000 0000');
          cy.get('input[name="cvc"]').type('123');
          cy.get('input[name="expiry_month"]').type('01');
          cy.get('input[name="expiry_year"]').type('1900');
          cy.get('#submit').click()
        })

      // Confirm order has been placed
Cypress.Commands.add('ConfirmOrderPlaced', ()=>{
      cy.get(".title.text-center").should("exist").invoke('text').then((txt)=>{
            expect(txt).to.equal("Order Placed!")
      })
    })
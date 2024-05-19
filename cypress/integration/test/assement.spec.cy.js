describe('Automation Exercise Assessment', () => {
    it('should login, fetch and sort items, add to cart, and place order', () => {
        // 1. Visit the website and click on Sign-In
        cy.visit("/");
        cy.loginButton();

        // 2. Sign-In using the provided credentials
         cy.SignIn();

         //3. Fetch and sort items by price under FEATURED ITEMS
        cy.FetchItem();

        
     // 4. Scroll Up - Navigate to Women >> Tops >> Women-Tops
        cy.NavigateWomenTops();
          
      
    // 5. Select Fancy Green Top and Summer White Top, then add to cart
        cy.selectFancyGreenAndSummerWhite();
       
   
        // 6. Proceed to checkout and place order
        cy.ProceedCheckoutOrder();

     // Enter card details
         cy.EnterCardDetails();

      // Confirm order has been placed
     
         cy.ConfirmOrderPlaced();
})
})

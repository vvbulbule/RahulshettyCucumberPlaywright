import {expect} from "@playwright/test"
export class CartPage{
    constructor (page){
        // if we want to declare any Locators then better to declare it in constructor
        // this.VariableName so this is refreing to current class variables
        // this.VariableName is class level Variables i.e We are Storing the Locotor in Variable
        // if somebody creates an object for this class LoginPage all the variables will be initialized
        this.page = page;
        this.cartProducts = page.locator("div li") // Cart product locator
        this.CheckouBtn= page.locator("button:has-text('Checkout')")// Checkout Btn
        
        
    }

    //Verify that Product added to Cart Page will displayed 
    // Value of this productName comes from Test Case
    async VerifyProductIsDisplayed(productName){    
        await this.cartProducts.first().waitFor()
        const bool=await this.getProductLocator(productName).isVisible()// if present it will return true
        expect (bool).toBeTruthy()// verify that value is True
    }

    // This method is written for locator await page.locator("h3:has-text('ZARA COAT 3')")
    // This locator is passed to above method
    getProductLocator(productName)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}

    async navigateToPaymentPage(){
        await this.CheckouBtn.click()
    }
        
    


}
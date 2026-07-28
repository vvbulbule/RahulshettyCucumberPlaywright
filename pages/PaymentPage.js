import { expect } from "@playwright/test";

export class PaymentPage{

    constructor (page){
        this.page = page;
        this.country = page.locator("[placeholder='Select Country']") ////Inspect Auto Suggesion Box
        this.dropdown = page.locator(".ta-results")////Inspect All the Suggestion comes below dropdown  
        this.emailId = page.locator("div label")// Inpect email comes automatically on Payment page
        this.CVV =  page.locator(".input.txt")// Inspect CVV
        this.CardName= page.locator(".input.txt") // Enter Card Name
        this.submitBtn = page.locator(".btnn.action__submit.ng-star-inserted")// PlaceOrder btn
       this.orderConfirmationText = page.locator(".hero-primary")// //  "Thankyou for the order." Message after Placing the Order
       this.orderId = page.locator("label.ng-star-inserted")
    }

    async searchCountryAndSelect(countryCode,countryName){
        //Inspect Auto Suggesion Box and enter partial test "Ind"  in the Auto Suggesion Box
                await this.country.pressSequentially(countryCode)
        
        
                //Wait for Options to Open in Auto Suggesions dropdown
                await this.dropdown.waitFor()
        
                // Inspect single elemet from the Auto Suggesion
                // Here we use Chaining of the locator
                const optionsCount= await this.dropdown.locator("button").count()
        
                //Iterate foe every value from auto suggesion and Match with Expected Value
                for (let i=0;i<optionsCount;i++){
                    const text= await this.dropdown.locator("button").nth(i).textContent()
                    if(text===countryName){
                        await this.dropdown.locator("button").nth(i).click()
                        console.log(text+" is selected") // India is selected
                        break
                    }
                }

        



        

    }
 
     async VerifyEmailId(username){

                 
       
        // Verify that email comes automatically on Payment page in email textbox is same as loggedin user's email ID
        // Here we can use the toHaveText() it will match the exact text 
        //const email= "vvbulbule@gmail.com";
        await expect(this.emailId).toContainText(username)
        
    }

    async SubmitAndGetOrderId(CVV,CardName){
         await this.CVV.nth(1).fill(CVV) //Enter the CVV 
     
        await this.CardName.nth(2).fill(CardName)   //Enter the Name on Card 
        // Click on PlaceOrder btn
        await this.submitBtn.click()

        // Verify "Thankyou for the order." Message after Placing the Order
         await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");

        return await this.orderId.textContent()

    }
}
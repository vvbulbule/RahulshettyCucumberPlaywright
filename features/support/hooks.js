import { POManager } from "../../pages/POManager.js";
import { Before, After, BeforeStep, AfterStep, Status } from "@cucumber/cucumber"; 
import { chromium } from "playwright";

// This Before is applied for Every Scenario in Feature File
Before(async function () {  
    this.browser = await chromium.launch({
           headless: false
       });
   
       this.context = await this.browser.newContext();
       this.page = await this.context.newPage();
    
       this.poManger = new POManager(this.page);
}); 

After(async function () { 
    await this.browser.close();
    // if we want to Clear any Test Data after executing the scenario we can it in After ()
    console.log("I am the last to Execute")
 
});

// This BeforeStep is applied for Every Step in the Scenario
BeforeStep(async function () { 
    console.log("Before Step"); 
}); 


// This AfterStep is applied for Every Step in the Scenario
AfterStep(async function ({ result }) { 

// As we know that AfterStep is applicable for each step in the scenario but using below if condition we are taking the screenshot only for the failed step 
    if (result.status === Status.FAILED) { 
        
        await this.page.screenshot({
            path: `screenshots/failed-${Date.now()}.png`
        });
    } 
}); 
 
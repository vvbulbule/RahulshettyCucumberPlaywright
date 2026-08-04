import { POManager } from "../../pages/POManager.js";
import { Before } from "@cucumber/cucumber"; 
import { chromium } from "playwright";


Before(async function () { 
    this.browser = await chromium.launch({
           headless: false
       });
   
       this.context = await this.browser.newContext();
       this.page = await this.context.newPage();
    
       this.poManger = new POManager(this.page);
}); 

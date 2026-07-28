export class OrderHistoryPage{

    constructor(page){
        //this.page = page;
        this.ordersrows= page.locator("tbody tr")
    }
    
async searchOrderAndSelect(orderId){
            await this.ordersrows.first().waitFor()

        //iterate all the rows and find the "Required orderID" to View the Order Details
        
        for (let i=0;i< await this.ordersrows.count();i++){
            // Here we applied chaining for the locator
            const rowOrderID=await this.ordersrows.nth(i).locator("th").textContent()
            


            // if loop to match the Expected and Actual OrderID
          
            if (orderId?.includes(rowOrderID?.trim())) {
                console.log("Order ID matched")
                // Now for the match orderid click on View Button to View Order Details
                await this.ordersrows.nth(i).locator("button").first().click()
                
                break
            }
        }
    }
}
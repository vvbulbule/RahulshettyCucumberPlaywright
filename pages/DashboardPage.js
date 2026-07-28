export class DashboardPage{

    //page value will get from test
    constructor (page){
        this.page = page;
        this.productsDetails = page.locator(".card-body")// productsDetails will save all the products information like Product Title, View Btn, Add to Card Btn
        this.ProductsTitles = page.locator(".card-body b")////Display all Product titles from Home Page
        this.cart= page.locator("[routerlink$='/dashboard/cart']")// Cart btn
        this.orders = page.locator("[routerlink='/dashboard/myorders']")
    }

    // productName comes from testcase
    async searchProductAndAddToCart(productName){

                /* we don't have to wait for first product to appear because the wait is already handled inside your ValidLogin() method.
                await this.ProductsTitles.first().waitFor();*/

                //Display all Product titles from Home Page
                const allProductTitle= await this.ProductsTitles.allTextContents()
                console.log(allProductTitle)//[ 'ADIDAS ORIGINAL', 'ZARA COAT 3', 'iphone 13 pro' ]
        
                // Now select the "ZARA COAT 3" Product from Home Page
                //const productName= "ZARA COAT 3"
                
                const count= await this.productsDetails.count()// This will give count the total number of Products
        
                //iterate all the products and add the "ZARA COAT 3" to the cart
                for (let i=0;i<count;i++){
                    //it will get all the productDetails for every iteration using productsDetails.nth(i)
                    // Here we applied the chaining of location i.e search the locator(b) inside the productDetails of i value iteration not in Whole Page
                    // productsDetails.nth(i).locator("b").textContent() it will fetches all the ProductNames
                    if (await this.productsDetails.nth(i).locator("b").textContent()===productName){
                        //Click on Add to Cart Btn
                        await this.productsDetails.nth(i).locator("text= Add To Cart").click()
                        //Once the Productname = "ZARA COAT 3" is found then no need to check other productNames so break is used
                        break
                        //await page.pause();
                    }
                }

        
    
    }

    async navigateToCartPage(){
        // click on Cart button top right corner to open the cart Page
        await this.cart.click()
    }

      async navigateToOrdersPage(){
        // click on Orders  button top right corner to open the orders Page
        await this.orders.nth(1).click()
    }
    

}
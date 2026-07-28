import {expect, test} from "@playwright/test"
import {POManager} from "../pages/POManager";
//When we Write Below line Node.js (or Playwright's build system) automatically reads the JSON file and converts it into a JavaScript object. 



/* Program : Complete Flow till the placing Order and verify the Order ID in OrdersHistory Page is Covered Under This Class  i.e. OrderHistoryPage.spec.js */

test("TC to Add the Product to Cart and place the Order", async({page})=>{

    
    const productName= "ZARA COAT 3"
    const UserName = "vvbulbule@gmail.com"
    const Password= "V12bulbule@" 
    const poManger = new POManager(page)
    const loginPage = poManger.getLoginPage();
    await loginPage.goTo()
    await loginPage.ValidLogin(UserName,Password)
    const dashboardPage = poManger.getDashboardPage()
    await dashboardPage.searchProductAndAddToCart(productName)
    await dashboardPage.navigateToCartPage()
    const cartPage = poManger.getCartPage()
    await cartPage.VerifyProductIsDisplayed(productName)
    await cartPage.navigateToPaymentPage()
    const paymentPage=poManger.getPaymentPage()
    await paymentPage.searchCountryAndSelect("ind"," India")
    const orderID = await paymentPage.SubmitAndGetOrderId("123","Vikrant Bulbule");
    console.log(orderID);
    await dashboardPage.navigateToOrdersPage();
    const orderHistoryPage=poManger.getOrderHistoryPage()
    await orderHistoryPage.searchOrderAndSelect(orderID)
    
   })
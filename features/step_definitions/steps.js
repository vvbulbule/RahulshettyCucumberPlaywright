import {When, Then, Given} from "@cucumber/cucumber"
import {POManager} from "../pages/POManager";
import {playwright} from "@playwright/test"

Given('User opens application', async function () {
  // Write code here that turns the phrase above into concrete actions
  // We can't pass the page directly here
  const browser = await playwright.chromium.launch()
  const context = await browser.newContext()
  const page = await context.newContext()
  const poManger = new POManager(page)
  const loginPage = poManger.getLoginPage();
    await loginPage.goTo()
});

// Test data username and password coming from feature file
When('User logs in using {string} and {string}', async function (UserName, Password) {
  // Write code here that turns the phrase above into concrete actions
  await loginPage.ValidLogin(UserName,Password)
    
});

When('User adds {string} to cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  const dashboardPage = poManger.getDashboardPage()
  await dashboardPage.searchProductAndAddToCart(productName)
  await dashboardPage.navigateToCartPage()

});

When('Verify {string} is Displayed in the cart', async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  const cartPage = poManger.getCartPage()
    await cartPage.VerifyProductIsDisplayed(productName)
    await cartPage.navigateToPaymentPage()
  

});

When('Enter the Valid Details and User proceeds to checkout', async function () {
  // Write code here that turns the phrase above into concrete actions
  const paymentPage=poManger.getPaymentPage()
    await paymentPage.searchCountryAndSelect("ind"," India")
    const orderID = await paymentPage.SubmitAndGetOrderId("123","Vikrant Bulbule");
    console.log(orderID);
});

Then('Order should be displayed in Order History', async function () {
  // Write code here that turns the phrase above into concrete actions
  await dashboardPage.navigateToOrdersPage();
    const orderHistoryPage=poManger.getOrderHistoryPage()
    await orderHistoryPage.searchOrderAndSelect(orderID)
});
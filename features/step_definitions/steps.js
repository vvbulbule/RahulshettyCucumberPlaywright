import {When, Then, Given} from "@cucumber/cucumber"
import { POManager } from "../../pages/POManager.js";
import {expect} from "@playwright/test"
import { chromium } from "playwright";
 
Given("User opens application", async function () {
 
     
    this.loginPage = this.poManger.getLoginPage();
 
    await this.loginPage.goTo();
});

// Time out 10 sec before gives failure
When('User logs in using {string} and {string}', {timeout : 100*1000},async function (UserName, Password) {
 
    await this.loginPage.ValidLogin(UserName, Password);
 
});
 
When('User adds {string} to cart', async function (productName) {
 
    this.dashboardPage = this.poManger.getDashboardPage();
 
    await this.dashboardPage.searchProductAndAddToCart(productName);
    await this.dashboardPage.navigateToCartPage();
 
});
 
When('Verify {string} is Displayed in the cart', async function (productName) {
 
    this.cartPage = this.poManger.getCartPage();
 
    await this.cartPage.VerifyProductIsDisplayed(productName);
    await this.cartPage.navigateToPaymentPage();
 
});
 
When('Enter the Valid Details and User proceeds to checkout', async function () {
 
    this.paymentPage = this.poManger.getPaymentPage();
 
    await this.paymentPage.searchCountryAndSelect("ind", " India");
 
    this.orderID = await this.paymentPage.SubmitAndGetOrderId(
        "123",
        "Vikrant Bulbule"
    );
 
    console.log(this.orderID);
 
});
 
Then('Order should be displayed in Order History', async function () {
 
    await this.dashboardPage.navigateToOrdersPage();
 
    this.orderHistoryPage = this.poManger.getOrderHistoryPage();
 
    await this.orderHistoryPage.searchOrderAndSelect(this.orderID);
 
});
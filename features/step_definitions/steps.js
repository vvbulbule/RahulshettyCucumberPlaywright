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

Given('User opens Login Ecommerce application2 with {string} and {string}', {timeout : 100*1000}, async function (Username2, Password2) {
  // Write code here that turns the phrase above into concrete actions
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await this.page.locator("#username").fill(Username2)//id=username
    await this.page.locator("[type='password']").fill(Password2)//InValid value for Password
    await this.page.locator("#signInBtn").click()
});

Then('Verify Error message is Displayed', async function () {
  // Write code here that turns the phrase above into concrete actions
  await expect(this.page.locator("[style='display: block;']")).toContainText("Incorrect username/password.");
});
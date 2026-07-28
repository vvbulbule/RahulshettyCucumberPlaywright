import {LoginPage} from "./LoginPage"
import {DashboardPage} from "./DashboardPage"
import {CartPage} from "./CartPage"
import { PaymentPage } from "./PaymentPage";
import { OrderHistoryPage } from "./OrderHistoryPage";



/*This Class is Created because if we have to get the methods from multiple page in our Test case  we have to create object of every page
     so to avoid this we can create One POManger File with all the Objects of all Classes of our Application 
     so just import that POManger file & call the methods of all The PO Classes by Creating Object of single file POManager In Test Case*/

export class POManager{
    constructor (page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.paymentPage= new PaymentPage(page)
        this.orderHistoryPage = new OrderHistoryPage(page)

    }

getLoginPage(){
    return this.loginPage;
}

getDashboardPage(){
    return this.dashboardPage;
}


getCartPage(){
    return this.cartPage;
}

getPaymentPage(){
    return this.paymentPage;

}

getOrderHistoryPage(){
    return this.orderHistoryPage;

}
    
}
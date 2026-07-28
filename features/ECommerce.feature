Feature: Place Order

  Scenario: Place an order successfully
    Given User opens application
    When User logs in using "vvbulbule@gmail.com" and "V12bulbule@"
    And User adds "ZARA COAT 3" to cart
    Then Verify "ZARA COAT 3" is Displayed in the cart
    And Enter the Valid Details and User proceeds to checkout
    Then Order should be displayed in Order History
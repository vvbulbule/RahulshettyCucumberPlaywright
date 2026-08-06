Feature: Login 
  @NegationTesting
  Scenario: InValid Login
    Given User opens Login Ecommerce application2 with "rahulshettyacademy" and "Learning"
    Then Verify Error message is Displayed
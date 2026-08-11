Feature: Login 
  @NegationTesting
  Scenario: InValid Login
    Given User opens Login Ecommerce application2 with "rahulshettyacademy" and "Learning"
    Then Verify Error message is Displayed

  
  @NegationTesting
Scenario Outline: InValid Login
    Given User opens Login Ecommerce application2 with "<username>" and "<password>"
    Then Verify Error message is Displayed

Examples: 
   | username            | password   | 
   | user1@gmail.com     | Password1  | 
   | user2@gmail.com     | Password2  | 
   | user3@gmail.com     | Password3  |
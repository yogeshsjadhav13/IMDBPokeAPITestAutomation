#Boundry value analysis for input text box on form
Scenario: Enter a valid number within range 10-100
Given user is on the form page
When user enters 10 in "Number of tentacles (10-100):" field
And clicks on Send button
Then user should get "Success" message

Scenario: Enter the minimum valid number
Given user is on the form page
When user enters 50 in "Number of tentacles (10-100):" field
And clicks on Send button
Then user should get "Success" message

Scenario: Enter the maximum valid number
Given user is on the form page
When user enters 100 in "Number of tentacles (10-100):" field
And clicks on Send button
Then user should get "Success" message

Scenario: Enter a number below the minimum range
Given user is on the form page
When user enters 9 in "Number of tentacles (10-100):" field
And clicks on Send button
Then user should get "Error" message with popup "Please select a value that is no less than 10"

Scenario: Enter a number above the maximum range
Given user is on the form page
When user enters 101 in "Number of tentacles (10-100):" field
And clicks on Send button
Then user should get "Error" message with popup "Please select a value that is no more than 100"

#Negative scenarios
Scenario: Enter a non-numeric value
Given user is on the form page
When user enters "a" in "Number of tentacles (10-100):" field
And clicks on Send button
Then user should get "Error" message with popup "Please enter a number."

Scenario: Enter a special character
Given user is on the form page
When user enters "@" in "Number of tentacles (10-100):" field
And clicks on Send button
Then user should get "Error" message with popup "Please enter a number."

Scenario: Enter a negative number
Given user is on the form page
When user enters "-11" in "Number of tentacles (10-100):" field
And clicks on Send button
Then user should get "Error" message with popup "Please select a value that is no less than 10"

Scenario: Enter a decimal number
Given user is on the form page
When user enters "10.5" in "Number of tentacles (10-100):" field
And clicks on Send button
Then user should get "Error" message with popup "Please select a valid value. The two nearest valid values are 10 and 11"
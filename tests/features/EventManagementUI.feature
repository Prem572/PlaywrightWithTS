Feature: Feature to Demonstrate Event Management UI

    Scenario: User create an event
        Given User login to app with username "PremGadga@gmail.com" and password "Prem@123456"
        When User navigates to the event creation page
        And I Create an event with following details:
            | EventName | Event      |
            | EventDate | 2026-12-31 |
            | Venue     | Halls      |
            | Category  | Conference |
            | City      | New York   |
            | Seats     | 100        |
            | Price     | 100        |
        Then Event should be created successfully
        And I verify that event is listed in the events table
        And I delete the created event
        Then I verify that event is deleted from the events table

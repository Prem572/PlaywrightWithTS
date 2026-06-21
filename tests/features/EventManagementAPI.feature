Feature: Feature to Demonstrate Event Management UI

    @API
    Scenario: User create an event using API and verify in UI
        Given User Generate APi token for "PremGadga@gmail.com" and Password "Prem@123456"
        And I Create an event using API with following details:
            | title       | Event                    |
            | eventDate   | 2026-06-20T09:00:00.000Z |
            | venue       | Halls                    |
            | category    | Conference               |
            | city        | New York                 |
            | totalSeats  | 100                      |
            | price       | 100                      |
            | description | Description              |

        And User login to app with username "PremGadga@gmail.com" and password "Prem@123456"
        When User navigates to the event creation page
        And I navigate to Events List page
        And I verify that event is listed in the events table
        And I delete the created event
        Then I verify that event is deleted from the events table
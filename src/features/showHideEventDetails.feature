Feature: Show/Hide Event Details

    Scenario: An event element is collapsed by default.
        Given the main page is open
        When the app displays a list of event
        Then the event details are hidden by default

    Scenario: User can expand an event to see details
        Given an event is displayed with collapsed details
        When the user interacts with the event to expand details
        Then the event details are shown

    Scenario: User can collapse an event to hide details
        Given an event is displayed with expanded details
        When the user interacts with the event to collapse details
        Then the event details are hidden

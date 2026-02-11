Feature: Weather Dashboard Testing

  Scenario: Welcome screen displays on initial load
    Given I navigate to the Weather Dashboard
    Then I should see the welcome screen
    And I should see "Welcome to Weather Dashboard" text

  Scenario: Search for a valid city displays weather data
    Given I navigate to the Weather Dashboard
    When I search for "London"
    Then I should see the current weather for "London"
    And I should see the city name "London"
    And I should see temperature information
    And I should see humidity information
    And I should see wind speed information
    And I should see the 5-day forecast

  Scenario: Search for another city updates the weather data
    Given I navigate to the Weather Dashboard
    When I search for "Tokyo"
    Then I should see the current weather for "Tokyo"
    And I should see the city name "Tokyo"

  Scenario: Search for invalid city shows error message
    Given I navigate to the Weather Dashboard
    When I search for "xyzinvalidcity123"
    Then I should see an error message
    And the error message should contain "City not found"

  Scenario: Loading state appears during data fetch
    Given I navigate to the Weather Dashboard
    When I start searching for "Paris"
    Then I should see a loading indicator
    
  Scenario: Mobile responsive design
    Given I navigate to the Weather Dashboard on mobile
    When I search for "New York"
    Then the layout should be mobile-friendly
    And the forecast should stack appropriately

# Weather Dashboard - Automated Testing

## Overview
This document explains the automated testing setup for the Weather Dashboard using Cucumber and Playwright.

## Test Framework
- **Cucumber**: BDD (Behavior-Driven Development) framework for writing human-readable test scenarios
- **Playwright**: Browser automation tool for testing web applications

## Running Tests

### Prerequisites
1. Ensure the development server is running:
   ```bash
   npm run dev
   ```
   The app should be accessible at http://localhost:5173

2. In a new terminal, run the tests:
   ```bash
   npm test
   ```

## Test Scenarios

The test suite covers the following scenarios:

### 1. Welcome Screen
- Verifies the welcome screen displays on initial load
- Checks for "Welcome to Weather Dashboard" text

### 2. Valid City Search
- Tests searching for "London"
- Verifies weather data is displayed
- Checks for temperature, humidity, wind speed
- Validates 5-day forecast appears

### 3. Multiple City Searches
- Tests switching between cities (Tokyo)
- Ensures data updates correctly

### 4. Error Handling
- Tests invalid city names
- Verifies error message appears
- Checks error message contains "City not found"

### 5. Loading State
- Verifies loading indicator appears during data fetch

### 6. Mobile Responsiveness
- Tests layout on mobile viewport (375px width)
- Verifies responsive design adapts correctly

## Test Files

- `tests/features/weather-dashboard.feature` - Cucumber feature file with test scenarios
- `tests/steps/weather-steps.js` - Step definitions with Playwright automation
- `cucumber.config.js` - Cucumber configuration

## Test Reports

After running tests, reports are generated in:
- `tests/reports/cucumber-report.html` - HTML report (open in browser)
- `tests/reports/cucumber-report.json` - JSON report

**Note:** Test reports are excluded from version control (.gitignore)

## Troubleshooting

If tests fail:
1. Ensure dev server is running on port 5173
2. Check that API key is valid and working
3. Verify internet connection (for API calls)
4. Check console for any errors

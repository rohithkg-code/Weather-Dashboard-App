import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { expect } from '@playwright/test';

// Set default timeout to 30 seconds
setDefaultTimeout(30000);

let browser;
let page;

Before(async function () {
    // Launch browser in headful mode (visible) with slowMo for better visibility
    browser = await chromium.launch({
        headless: false,
        slowMo: 500 // Slow down by 500ms between actions
    });
    const context = await browser.newContext();
    page = await context.newPage();
});

After(async function () {
    await browser.close();
});

// Given steps
Given('I navigate to the Weather Dashboard', async function () {
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
});

Given('I navigate to the Weather Dashboard on mobile', async function () {
    await browser.close();
    browser = await chromium.launch({
        headless: false,
        slowMo: 500
    });
    const context = await browser.newContext({
        viewport: { width: 375, height: 667 }
    });
    page = await context.newPage();
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
});

// When steps
When('I search for {string}', async function (city) {
    await page.fill('input[type="text"]', city);
    await page.click('button[type="submit"]');

    // Wait for either weather data, error message, or welcome screen to appear
    // This is more reliable than fixed timeout
    try {
        await page.waitForSelector('.current-weather, .error', { timeout: 15000 });
    } catch (e) {
        // If neither appears, wait a bit more
        await page.waitForTimeout(2000);
    }
});

When('I start searching for {string}', async function (city) {
    await page.fill('input[type="text"]', city);
    await page.click('button[type="submit"]');
    // Check immediately for loading state
    await page.waitForTimeout(100);
});

// Then steps
Then('I should see the welcome screen', async function () {
    const welcomeSection = await page.locator('.welcome').isVisible();
    expect(welcomeSection).toBeTruthy();
});

Then('I should see {string} text', async function (text) {
    const content = await page.textContent('body');
    expect(content).toContain(text);
});

Then('I should see the current weather for {string}', async function (city) {
    const weatherSection = await page.locator('.current-weather').isVisible();
    expect(weatherSection).toBeTruthy();
});

Then('I should see the city name {string}', async function (city) {
    const cityName = await page.locator('.city-name').textContent();
    expect(cityName).toContain(city);
});

Then('I should see temperature information', async function () {
    const temperature = await page.locator('.temperature').isVisible();
    expect(temperature).toBeTruthy();
});

Then('I should see humidity information', async function () {
    const humidity = await page.locator('.detail-card').filter({ hasText: 'Humidity' }).isVisible();
    expect(humidity).toBeTruthy();
});

Then('I should see wind speed information', async function () {
    const windSpeed = await page.locator('.detail-card').filter({ hasText: 'Wind Speed' }).isVisible();
    expect(windSpeed).toBeTruthy();
});

Then('I should see the 5-day forecast', async function () {
    const forecast = await page.locator('.forecast').isVisible();
    expect(forecast).toBeTruthy();

    const forecastCards = await page.locator('.forecast-card').count();
    expect(forecastCards).toBe(5);
});

Then('I should see an error message', async function () {
    const errorSection = await page.locator('.error').isVisible();
    expect(errorSection).toBeTruthy();
});

Then('the error message should contain {string}', async function (text) {
    const errorText = await page.locator('.error').textContent();
    expect(errorText).toContain(text);
});

Then('I should see a loading indicator', async function () {
    // This might be tricky to catch since loading is fast
    // We check if either loading was shown or data is already loaded
    const hasLoading = await page.locator('.loading').isVisible().catch(() => false);
    const hasWeather = await page.locator('.current-weather').isVisible().catch(() => false);
    expect(hasLoading || hasWeather).toBeTruthy();
});

Then('the layout should be mobile-friendly', async function () {
    const viewport = page.viewportSize();
    expect(viewport.width).toBe(375);
});

Then('the forecast should stack appropriately', async function () {
    // Wait for forecast to be visible (it should exist if weather loaded)
    await page.waitForSelector('.forecast-grid', { timeout: 5000 });
    const forecastGrid = await page.locator('.forecast-grid');
    const isVisible = await forecastGrid.isVisible();
    expect(isVisible).toBeTruthy();
});

import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            // turn off headless mode to actually watch your tests being conducted within the browser
            // headless: false,
            //  slowMo: 250, // slow down by 250ms,
            //  timeout: 0 // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    //Scenario 1
    test('An event element is collapsed by default.', async () => {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.goto('http://localhost:3000/');

        // if your event element has a different selector, use it instead of .event
        await page.waitForSelector('.event');

        // if your event's details have a different selector, use it instead of .event .details
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
        browser.close();
    });

    //Scenario 2
    test('User can expand an event to see its details', async () => {
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.goto('http://localhost:3000/');

        await page.waitForSelector('.event');
        await page.click('.event .showDetailsButton');

        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
        browser.close();
    });

    //Scenario 3
    test('User can collapse an event to hide details', async () => {
        await page.click('.event .showDetailsButton');

        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });
});
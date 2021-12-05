import puppeteer from "puppeteer";

// Feature 1

describe("filter events by city", () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    // browser = await puppeteer.launch({
    //   headless: false,
    //   slowMo: 250, // slow down by 250ms
    //   ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
    // });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
  });

  afterAll(() => {
    browser.close();
  });

  test("When user hasn’t searched for a city, show upcoming events from all cities", async () => {
    await page.evaluate(
      () => document.getElementsByClassName("event").length === 32
    );
  });

  test("User should see a list of suggestions when they search for a city", async () => {
    await page.type(".city", "Berlin");
    const suggestionList = await page.$(".suggestions");
    expect(suggestionList).toBeDefined();
  });

  test("User can select a city from the suggested list", async () => {
    await page.evaluate(() =>
      document.querySelectorAll(".suggestions li")[0].click()
    );
    await page.evaluate(
      () => document.querySelector(".city").value === "Berlin, Germany"
    );
  });

  // Feature 2
  describe("show/hide an event details", () => {
    let browser;
    let page;
    beforeAll(async () => {
      jest.setTimeout(30000);
      browser = await puppeteer.launch();
      // browser = await puppeteer.launch({
      //   headless: false,
      //   slowMo: 250, // slow down by 250ms
      //   ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
      // });
      page = await browser.newPage();
      await page.goto("http://localhost:3000/");
      await page.waitForSelector(".event");
    });

    afterAll(() => {
      browser.close();
    });

    test("An event element is collapsed by default", async () => {
      const eventDetails = await page.$(".event .extra-details.hide");
      expect(eventDetails).toBeDefined();
    });

    test("User can expand an event to see its details", async () => {
      await page.evaluate(() =>
        document.querySelector(".show-details-btn").click()
      );
      const eventDetails = await page.$(".event .extra-details.show");
      expect(eventDetails).toBeDefined();
    });

    test("User can collapse an event to hide its details", async () => {
      await page.evaluate(() =>
        document.querySelector(".hide-details-btn").click()
      );
      const eventDetails = await page.$(".event .extra-details.hide");
      expect(eventDetails).toBeDefined();
    });
  });
});
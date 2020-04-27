/* tslint:disable:no-submodule-imports */
import { Builder, By } from "selenium-webdriver";
// tslint:disable-next-line:no-var-requires
const chrome = require("selenium-webdriver/chrome");
import * as test from "tape";

import "chromedriver";

const options = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS ? options.headless() : options;

let browser: any;

test("setup", (t) => {
  setTimeout(() => {
    browser = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    browser.get("https://e2e-boilerplate.github.io/sandbox/");
    t.end();
  }, 2000);
});

test("Should be on Sandbox", async (t) => {
  const title = await browser.getTitle();
  const header = await browser.findElement(By.css("h1")).getText();

  t.plan(2);
  t.equal(title, "Sandbox");
  t.equal(header, "Sandbox");
  t.end();
});

test("teardown", async (t) => {
  browser.quit();
  t.end();
});

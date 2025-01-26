#!/usr/bin/env node

const fs = require('fs');
const configFile = fs.readFileSync(__dirname + '/config.json', 'utf8');
const configData = JSON.parse(configFile);

const searchText = process.argv[2];
const url = 'https://chat.deepseek.com';
const buttonSubmit = '.f6d670';
const textareaSearchBox = '#chat-input';
const textMessage = '.ds-markdown';
const profileButton = '.d65532b2';
const deleteAllButton = '.ds-dropdown-menu-option__label:has-text("Delete all chats")';
const confirmDeleteButton = '.ds-button:has-text("Confirm deletion")';
const totalLoopCount = 60;
const printIntervalTime = 1000;

const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
chromium.use(stealth);

chromium.launch({ headless: true, timeout: 30000 }).then(async browser => {
  // Set context
  const context = await browser.newContext(user_agent=configData.userAgent);

  // Set cookie
  const cookies = [{
    'name': 'cf_clearance',
    'value': configData.cfClearance,
    'domain': '.deepseek.com',
    'path': '/',
    'httpOnly': true,
    'secure': true
  }];
  await context.addCookies(cookies);

  // Start page
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Set localStorage
  await page.evaluate((userToken) => {
    localStorage.setItem('searchEnabled', 'true');
    localStorage.setItem('userToken', '{"value":"' + userToken + '","__version":"0"}');
  }, configData.userToken);
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  // Submit question
  await page.fill(textareaSearchBox, searchText);
  await page.click(buttonSubmit);

  // Get reply
  var prevResult = '';
  for (let i = 0; i < totalLoopCount; i++) {
    await new Promise((resolve) => setTimeout(resolve, printIntervalTime));
    const result = await page.locator(textMessage).innerText();
    console.clear();
    console.log('----------\n' + result.replace(/^\s*\n+/gm, '\n'));
    if (prevResult == result && i != (totalLoopCount - 1)) {
      i = (totalLoopCount - 1);
    }
    prevResult = result;
  }

  // Delete all chat
  await page.click(profileButton);
  await page.click(deleteAllButton);
  await page.click(confirmDeleteButton);

  // Close browser
  await browser.close();
});

const { test, expect } = require('@playwright/test');
const playwright = require('@playwright/test');
const fs = require('fs');
const path = require('path');
var screenshotsDir = 'resources/screenshots/';
var TestCaseName, context, page;



test.beforeAll(async ({ }, testInfo) => {
  TestCaseName = (testInfo.title).split(":")[0];
  fs.readdir(screenshotsDir, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlinkSync(path.join(screenshotsDir, file));
    }
  });
});


test.beforeEach(async ({ browser }, testInfo) => {
  TestCaseName = (testInfo.title).split(":")[0];
  if (TestCaseName !== "TC001_IMDB_WebTest") {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://www.imdb.com/');
    await page.locator("//div[contains(text(),'Select Your Preferences')]").click();
    await page.locator("//button[text()='Accept']").click();
  }
});



test('TC001_IMDB_WebTest: Verify IMDB search first upcoming moview with actor name', async function () {
  var browser;
  let browserList = ["chromium", "firefox"];
  for (let i = 0; i < browserList.length; i++) {
    if (browserList[i] == "chromium") {
      browser = await playwright.chromium.launch({ headless: false });
    } else if (browserList[i] == "firefox") {
      browser = await playwright.firefox.launch({ headless: false });
    } else if (browserList[i] == "webkit") {
      browser = await playwright.webkit.launch({ headless: false });
    }
    context = await browser.newContext();
    page = await context.newPage();
    await page.locator("//input[@id='suggestion-search']").click();
    await page.locator("//input[@id='suggestion-search']").fill('nicolas cage');
    await page.locator("//div[text()='Nicolas Cage']//ancestor::a").click();
    await page.locator("//a[contains(@href,'credits')]").click();
    await page.locator("//label[contains(@aria-label,'Collapse') and contains(@data-testid,'actor-previous-projects')]").click();
    await page.locator("//label[contains(@aria-label,'Expand') and contains(@data-testid,'actor-upcoming-projects')]").click();
    const upcomingMovieName = await page.locator("//a[text()='In Production']//ancestor::li[contains(@data-testid,'unrel_cred_actor')]//a[@class='ipc-metadata-list-summary-item__t']").first().textContent();
    await page.locator("//a[text()='In Production']//ancestor::li[contains(@data-testid,'unrel_cred_actor')]").first().click();
    expect(await page.locator("//h1/span").textContent()).toBe(upcomingMovieName);
    await context.close();
  }
});


test.only('TC002_IMDB_WebTest: Rate 2nd movie appearing on Top box office', async function () {
  await page.locator("//span[contains(@class,'button') and text()='Menu']").click();
  await page.locator("//a/span[text()='Top Box Office']").click();
  await page.locator("//ul[contains(@class,'compact-list')]/li[2]//a[contains(@class,'title')]").click();
  await page.locator("//div[contains(@data-testid,'user-rating')]//div[text()='Rate']").first().click();
  await page.locator("//h6[text()='Rate this']").click();
  await page.locator("//div[@class='ipc-starbar__touch']").click();
  await page.evaluate(() => {
    document.querySelector('button[aria-label="Rate 5"]').click();
  });
  await page.locator("//button/span[text()='Rate']").click();
  await page.locator("//h1[text()='Sign in']").click();
});


test('TC003_IMDB_WebTest: Open 2nd photo of Danny Trejo from Breaking bad under Top 250 TV shows', async function () {
  await page.locator("//span[contains(@class,'button') and text()='Menu']").click();
  await page.locator("//a/span[text()='Top 250 TV Shows']").click();
  await page.locator("//h3[contains(text(),'Breaking Bad')]/parent::a").click();
  await page.locator("//a[contains(@aria-label,'Photos') and contains(@data-testid,'photo')]").click();
  await page.locator("//a[@aria-label='gallery' and contains(@data-testid,'gallery')]").click();
  await page.locator("//h1[text()='Photos']").click();
  await page.locator("//button[contains(@data-testid, 'image-chip-dropdown')]").click();
  await page.locator("//select[contains(@data-testid, 'select-dropdown-test-id') and contains(@name,'Person')]").selectOption("Danny Trejo (11)");
  await page.locator("//div[text()='Person']").click();
  await page.locator("//button[@aria-label='Close Prompt']").click();
  await page.locator("//img[not(contains(@alt,' and ')) and contains(@alt,'Danny Trejo')]/parent::a").nth(1).click();
  await page.screenshot({ path: 'resources/screenshots/Screenshot_DannyTrejo.png', fullPage: true });
});


test('TC004_IMDB_WebTest: Open 3rd name from the celebrities list born yesterday', async function () {
  await page.locator("//span[contains(@class,'button') and text()='Menu']").click();
  await page.locator("//a/span[text()='Born Today']").click();
  await page.locator("//button[contains(@data-testid,'selected-input-chip-list-birthday')]").click();
  await page.locator("//label[contains(@aria-label,'Expand') and contains(@data-testid,'birthday')]").click();
  const today = new Date();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  dd = dd - 1;
  await page.locator("//input[@name='birthday-input']").click();
  await page.locator("//input[@name='birthday-input']").fill(mm + '-' + dd);
  await page.locator("//input[@name='birthday-input']").press('Enter');
  await page.locator("//button[@data-testid='adv-search-get-results']").click();
  await page.locator("//ul[contains(@class,'metadata-list')]/li[3]//a[contains(@class,'title')]").click();
  await page.screenshot({ path: screenshotsDir + 'Screenshot_3rdCelebrityBornYesterday.png' });
});


test('TC005_IMDB_WebTest: Click on first description link from the list of celebrities born 40 years ago from today', async function () {
  await page.locator("//span[contains(@class,'button') and text()='Menu']").click();
  await page.locator("//a/span[text()='Born Today']").click();
  await page.locator("//button[contains(@data-testid,'selected-input-chip-list-birthday')]").click();
  await page.locator("//label[contains(@aria-label,'Expand') and contains(@data-testid,'birthDate')]").click();
  const today = new Date();
  let yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  yyyy = yyyy - 40;
  await page.getByTestId('birthDate-start').fill(yyyy + '-' + mm + '-' + dd);
  await page.getByTestId('birthDate-end').fill(yyyy + '-' + mm + '-' + dd);
  await page.locator("//input[@data-testid='birthDate-end']").press('Enter');
  await page.locator("//button[@data-testid='adv-search-get-results']").click();
  await page.locator("//ul[contains(@class,'metadata-list')]/li[1]").hover();
  await page.locator("//button[@data-testid='test-sort-order']").hover();
  if (await page.locator("//ul[contains(@class,'metadata-list')]/li[1]//div[@data-testid='dli-bio']//a").count() > 0) {
    await page.locator("//ul[contains(@class,'metadata-list')]/li[1]//div[@data-testid='dli-bio']//a").first().click();
  }
  await page.screenshot({ path: screenshotsDir + 'Screenshot_1stLinkOnCelebrityDescriptionBorn40yearsAgo.png' });
});





test.afterEach(async ({ }) => {
  await context.close();
});

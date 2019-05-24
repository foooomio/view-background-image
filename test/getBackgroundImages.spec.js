const assert = require('assert');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const launchOptions = {
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
};

const testCaseDir = path.resolve(__dirname, 'html');
const contentScript = path.resolve(__dirname, '../src/content.js');

describe('getBackgroundImages', function() {
    let browser, page;

    this.timeout(0);
    this.slow(1000);

    before(async function() {
        browser = await puppeteer.launch(launchOptions);
        page = await browser.newPage();
    });

    after(async function() {
        console.log('  on ' + await browser.version());
        await browser.close();
    });

    const expected = ['blue.png'];
    const point = { x: 50, y: 50 };

    fs.readdirSync(testCaseDir).forEach(filename => {
        it(filename, async function() {
            await page.goto('file://' + path.resolve(testCaseDir, filename));
            await page.addScriptTag({ path: contentScript });

            /* global getBackgroundImages */
            const results = await page.evaluate(
                (x, y) => getBackgroundImages(document, x, y), point.x, point.y
            );

            const actual = results.map(r => path.basename(r));
            assert.deepStrictEqual(actual, expected);
        });
    });
});

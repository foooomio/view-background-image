import { test, expect } from '@playwright/test';
import { basename } from 'node:path';

interface TestCase {
  title: string;
  point: [x: number, y: number];
  expected: string[];
  skip?: string[];
}

const testCases: TestCase[] = [
  {
    title: 'body_attr',
    point: [50, 50],
    expected: ['blue.png'],
  },
  {
    title: 'body_css',
    point: [50, 50],
    expected: ['blue.png'],
  },
  {
    title: 'image-set',
    point: [50, 50],
    expected: ['blue.png'],
    skip: ['firefox'],
  },
  {
    title: 'img',
    point: [50, 50],
    expected: ['blue.png'],
  },
  {
    title: 'overlap',
    point: [50, 50],
    expected: ['blue.png'],
  },
  {
    title: 'pseudo_content',
    point: [50, 50],
    expected: ['blue.png'],
  },
  {
    title: 'pseudo_element',
    point: [50, 50],
    expected: ['blue.png'],
  },
  {
    title: 'shadow_dom',
    point: [50, 50],
    expected: ['blue.png'],
  },
];

for (const { title, point, expected, skip } of testCases) {
  test(title, async ({ page, browserName }) => {
    test.skip(!!skip?.includes(browserName));

    await page.goto(import.meta.resolve(`./html/${title}.html`));
    await page.addScriptTag({
      url: import.meta.resolve('../src/content.js'),
    });

    const actual = await page.evaluate(
      // @ts-ignore
      ([x, y]) => [...getBackgroundImages(document, x, y)],
      point,
    );

    expect(actual.map((url) => basename(url))).toEqual(expected);
  });
}

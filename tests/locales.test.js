import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs/promises';

const keys = [
  'extName',
  'extDescription',
  'review',
  'donation',
  'security',
  'reload',
  'failure',
  'report',
];

test('locales', async (t) => {
  const locales = await fs.readdir(new URL('../src/_locales', import.meta.url));

  for (const locale of locales) {
    await t.test(locale, async (t) => {
      const { default: messages } = await import(
        import.meta.resolve(`../src/_locales/${locale}/messages.json`),
        { assert: { type: 'json' } }
      );

      for (const key of keys) {
        await t.test(key, () => {
          assert(typeof messages[key].message === 'string');
        });
      }
    });
  }
});

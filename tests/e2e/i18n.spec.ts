import { test, expect } from '@playwright/test';
import { waitReady, runComparison } from './_helpers';

// Content routing is engine-independent; one browser is enough.
test.describe('i18n', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'content routing (one engine)');
  });

  for (const loc of [
    { path: '/compare-text/', lang: 'en' },
    { path: '/compare-text/ja/', lang: 'ja' },
  ]) {
    test(`compares on the ${loc.lang} route (#5)`, async ({ page }) => {
      await page.goto(loc.path);
      await waitReady(page);
      await runComparison(page);
    });
  }

  test('serves every locale with the correct <html lang>', async ({ page }) => {
    const expected: Array<[string, string]> = [
      ['/compare-text/', 'en'],
      ['/compare-text/ja/', 'ja'],
      ['/compare-text/zh/', 'zh-Hans'],
      ['/compare-text/de/', 'de'],
      ['/compare-text/es/', 'es'],
    ];
    for (const [path, lang] of expected) {
      await page.goto(path);
      expect(await page.getAttribute('html', 'lang'), `lang on ${path}`).toBe(lang);
    }
  });
});

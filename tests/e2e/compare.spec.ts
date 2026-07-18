import { test, expect } from '@playwright/test';
import { waitReady } from './_helpers';

// Deliberately interleaved: unchanged, removed, added, unchanged, removed, added,
// unchanged, pure-append — so the highlighting and the +/- summary count both get a
// real workout, not just a trivial one-line change.
const ORIGINAL = 'keep1\nremoveA\nkeep2\nremoveB\nkeep3';
const CHANGED = 'keep1\naddedA\nkeep2\naddedB\nkeep3\naddedC';

test.describe('compare two texts', () => {
  test('highlights added/removed/unchanged lines and shows the correct +/- summary, uploading nothing', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (req) => {
      const url = req.url();
      if (!url.startsWith('http://localhost:4321') && !url.startsWith('data:') && !url.startsWith('blob:')) {
        external.push(url);
      }
    });

    await page.goto('/compare-text/');
    await waitReady(page);

    await page.fill('#ct-original', ORIGINAL);
    await page.fill('#ct-changed', CHANGED);

    await expect(page.locator('#ct-summary')).toContainText('+3 lines added, -2 lines removed');

    const rows = page.locator('.ct-diff-line');
    await expect(rows).toHaveCount(8); // keep1, removeA, addedA, keep2, removeB, addedB, keep3, addedC

    const unchanged = page.locator('.ct-diff-line--unchanged');
    const added = page.locator('.ct-diff-line--added');
    const removed = page.locator('.ct-diff-line--removed');
    await expect(unchanged).toHaveCount(3);
    await expect(added).toHaveCount(3);
    await expect(removed).toHaveCount(2);

    await expect(unchanged.nth(0)).toContainText('keep1');
    await expect(removed.nth(0)).toContainText('removeA');
    await expect(added.nth(0)).toContainText('addedA');
    await expect(unchanged.nth(1)).toContainText('keep2');
    await expect(removed.nth(1)).toContainText('removeB');
    await expect(added.nth(1)).toContainText('addedB');
    await expect(unchanged.nth(2)).toContainText('keep3');
    await expect(added.nth(2)).toContainText('addedC');

    // The +/- marker is real (non color-only) text, not just a background color.
    await expect(added.first().locator('.ct-diff-marker')).toHaveText('+');
    await expect(removed.first().locator('.ct-diff-marker')).toHaveText('-');

    expect(external, `unexpected cross-origin requests: ${external.join(', ')}`).toHaveLength(0);
  });

  test('clear both resets the inputs and the diff result', async ({ page }) => {
    await page.goto('/compare-text/');
    await waitReady(page);
    await page.fill('#ct-original', ORIGINAL);
    await page.fill('#ct-changed', CHANGED);
    await expect(page.locator('#ct-summary')).toContainText('+3 lines added, -2 lines removed');

    await page.click('#clear-action');

    await expect(page.locator('#ct-original')).toHaveValue('');
    await expect(page.locator('#ct-changed')).toHaveValue('');
    await expect(page.locator('#ct-summary')).toContainText('+0 lines added, -0 lines removed');
    await expect(page.locator('.ct-diff-line')).toHaveCount(0);
    await expect(page.locator('#clear-action')).toBeDisabled();
    await expect(page.locator('#copy-action')).toBeDisabled();
  });

  test('shows nothing to diff until both sides have text', async ({ page }) => {
    await page.goto('/compare-text/');
    await waitReady(page);
    await expect(page.locator('.ct-diff-line')).toHaveCount(0);
    await expect(page.locator('#copy-action')).toBeDisabled();

    await page.fill('#ct-original', 'only one side filled in');
    // A one-sided comparison is still a valid diff (everything "removed"), so the
    // action buttons should already be live even before the other side is filled.
    await expect(page.locator('#copy-action')).toBeEnabled();
  });

  test.describe('large-input warning (chromium only, one engine is enough)', () => {
    test.beforeEach(({}, testInfo) => {
      test.skip(testInfo.project.name !== 'chromium', 'pure UI check, single engine');
    });

    test('shows a friendly warning for a very large input instead of choking', async ({ page }) => {
      await page.goto('/compare-text/');
      await waitReady(page);

      // Just over the ~5MB warning threshold. Set via the native value setter + a
      // real 'input' event rather than locator.fill() — fill() drives this through
      // much slower text-insertion machinery and is not representative of how a
      // browser actually receives a large paste (one Clipboard event, one value
      // assignment), which is what this scenario is meant to simulate.
      const big = 'same line\n'.repeat(520_000); // ~5.2MB
      await page.evaluate((text) => {
        const setValue = (id: string) => {
          const el = document.querySelector(id) as HTMLTextAreaElement;
          const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')!.set!;
          setter.call(el, text);
          el.dispatchEvent(new Event('input', { bubbles: true }));
        };
        setValue('#ct-original');
        setValue('#ct-changed');
      }, big);

      await expect(page.locator('.ct-warning').first()).toBeVisible({ timeout: 15_000 });
      // The comparison still completes (identical input -> no added/removed lines).
      await expect(page.locator('#ct-summary')).toContainText('+0 lines added, -0 lines removed', {
        timeout: 15_000,
      });
    });
  });

  test.describe('copy diff to clipboard (chromium only, clipboard permissions)', () => {
    test.beforeEach(({}, testInfo) => {
      test.skip(testInfo.project.name !== 'chromium', 'Clipboard permission grants are Chromium-only in Playwright');
    });

    test('copies the unified diff text to the clipboard', async ({ page, context }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      await page.goto('/compare-text/');
      await waitReady(page);
      await page.fill('#ct-original', ORIGINAL);
      await page.fill('#ct-changed', CHANGED);
      await expect(page.locator('#ct-summary')).toContainText('+3 lines added, -2 lines removed');

      await page.click('#copy-action');
      await expect(page.locator('#copy-action')).toContainText(/copied/i);

      const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
      expect(clipboardText).toContain('+ addedA');
      expect(clipboardText).toContain('- removeA');
      expect(clipboardText).toContain('  keep1');
    });
  });
});

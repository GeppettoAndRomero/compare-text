import { type Page, expect } from '@playwright/test';

/** Wait until the island has hydrated and is ready for input. */
export async function waitReady(page: Page) {
  await page.waitForFunction(() => (window as Record<string, unknown>).__toolReady === true);
}

// A small, deterministic pair of texts: one unchanged line, one removed line
// replaced by one added line, and one pure append — used by covenant/i18n specs
// that just need *a* real comparison to run, not to assert the exact diff shape.
export const SAMPLE_ORIGINAL = 'line one\nline two\nline three';
export const SAMPLE_CHANGED = 'line one\nline two changed\nline three\nline four';

/**
 * Fill both sides with the sample texts and wait for the (debounced) diff to settle.
 * The summary text itself is localized (e.g. "+2 行追加、-1 行削除" on /ja/), so this
 * waits on the rendered diff row count instead of a locale-specific string — callers
 * that need the exact wording assert it themselves.
 */
export async function runComparison(page: Page) {
  await page.fill('#ct-original', SAMPLE_ORIGINAL);
  await page.fill('#ct-changed', SAMPLE_CHANGED);
  // SAMPLE_ORIGINAL/SAMPLE_CHANGED diff to exactly 5 rows (2 unchanged, 1 removed, 2 added).
  await expect(page.locator('.ct-diff-line')).toHaveCount(5);
}

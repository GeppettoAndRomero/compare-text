/**
 * Large-input detection.
 *
 * There is no hard size limit — `diffLines` is fast enough on the main thread for
 * ordinary text. This is only used to show a friendly, non-blocking warning when an
 * input is large enough (~5MB of text) that a diff could take a moment and typing
 * may feel less snappy. See issue #70 scope notes.
 */

/** Approximate byte threshold ("~5MB of text") above which we warn. */
export const LARGE_INPUT_CHARS = 5_000_000;

/** True once a text is large enough to warrant the "this may be slow" notice. */
export function isLargeText(text: string): boolean {
  return text.length > LARGE_INPUT_CHARS;
}

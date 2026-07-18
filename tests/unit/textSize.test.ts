import { describe, it, expect } from 'vitest';
import { isLargeText, LARGE_INPUT_CHARS } from '@/utils/textSize';

describe('isLargeText', () => {
  it('is false for ordinary, short text', () => {
    expect(isLargeText('a short line of text')).toBe(false);
  });

  it('is false right at the threshold', () => {
    expect(isLargeText('a'.repeat(LARGE_INPUT_CHARS))).toBe(false);
  });

  it('is true just past the threshold', () => {
    expect(isLargeText('a'.repeat(LARGE_INPUT_CHARS + 1))).toBe(true);
  });

  it('is false for an empty string', () => {
    expect(isLargeText('')).toBe(false);
  });
});

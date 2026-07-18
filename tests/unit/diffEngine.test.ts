import { describe, it, expect } from 'vitest';
import { computeDiff, formatUnifiedDiff } from '@/utils/diffEngine';

describe('computeDiff', () => {
  it('marks every line unchanged when the two texts are identical', () => {
    const result = computeDiff('a\nb\nc', 'a\nb\nc');
    expect(result.lines).toEqual([
      { type: 'unchanged', text: 'a' },
      { type: 'unchanged', text: 'b' },
      { type: 'unchanged', text: 'c' },
    ]);
    expect(result.added).toBe(0);
    expect(result.removed).toBe(0);
  });

  it('marks every line added when the original is empty', () => {
    const result = computeDiff('', 'a\nb');
    expect(result.lines).toEqual([
      { type: 'added', text: 'a' },
      { type: 'added', text: 'b' },
    ]);
    expect(result.added).toBe(2);
    expect(result.removed).toBe(0);
  });

  it('marks every line removed when the changed text is empty', () => {
    const result = computeDiff('a\nb', '');
    expect(result.lines).toEqual([
      { type: 'removed', text: 'a' },
      { type: 'removed', text: 'b' },
    ]);
    expect(result.added).toBe(0);
    expect(result.removed).toBe(2);
  });

  it('detects a pure append (no changes to existing lines)', () => {
    const result = computeDiff('a\nb', 'a\nb\nc');
    expect(result.lines).toEqual([
      { type: 'unchanged', text: 'a' },
      { type: 'unchanged', text: 'b' },
      { type: 'added', text: 'c' },
    ]);
    expect(result.added).toBe(1);
    expect(result.removed).toBe(0);
  });

  it('detects a pure insertion in the middle, keeping surrounding lines unchanged', () => {
    const result = computeDiff('a\nc', 'a\nb\nc');
    expect(result.lines).toEqual([
      { type: 'unchanged', text: 'a' },
      { type: 'added', text: 'b' },
      { type: 'unchanged', text: 'c' },
    ]);
  });

  it('interleaves additions, removals and unchanged lines for a replaced line', () => {
    // line2 is replaced by line2b; line1/line3 stay put; line4 is a pure append.
    const result = computeDiff('line1\nline2\nline3', 'line1\nline2b\nline3\nline4');
    const byType = (t: 'added' | 'removed' | 'unchanged') =>
      result.lines.filter((l) => l.type === t).map((l) => l.text);

    expect(byType('unchanged')).toEqual(['line1', 'line3']);
    expect(byType('removed')).toEqual(['line2']);
    expect(byType('added')).toEqual(['line2b', 'line4']);
    expect(result.added).toBe(2);
    expect(result.removed).toBe(1);
  });

  it('handles both texts being empty', () => {
    const result = computeDiff('', '');
    expect(result.lines).toEqual([]);
    expect(result.added).toBe(0);
    expect(result.removed).toBe(0);
  });

  it('does not add a phantom trailing empty line for input with no trailing newline', () => {
    const result = computeDiff('a\nb', 'a\nb\nc');
    // Exactly 3 rows, not 4 — a naive '\n'.split() on 'a\nb\n' style values would
    // otherwise leave a stray '' line entry.
    expect(result.lines).toHaveLength(3);
  });
});

describe('formatUnifiedDiff', () => {
  it('prefixes added/removed/unchanged lines with +, - and a blank space', () => {
    const result = computeDiff('keep\nold', 'keep\nnew');
    expect(formatUnifiedDiff(result)).toBe('  keep\n- old\n+ new');
  });

  it('renders an empty diff as an empty string', () => {
    expect(formatUnifiedDiff(computeDiff('', ''))).toBe('');
  });
});

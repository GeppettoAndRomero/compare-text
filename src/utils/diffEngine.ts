/**
 * Line-level diff engine.
 *
 * Thin, pure wrapper around jsdiff's `diffLines` (see NOTICE.md for licensing). Word/character
 * diff is intentionally out of scope for this tool (see issue #70) — only line granularity.
 *
 * `diffLines` returns Change[] whose `value` is a run of one or more *whole* lines glued back
 * together with '\n'. This module re-splits each run into individual DiffLineEntry rows so the
 * widget can render one row per line (with a leading +/-/space marker) and so the added/removed
 * counts are exact line counts, not chunk counts.
 */
import { diffLines } from 'diff';

export type DiffLineType = 'added' | 'removed' | 'unchanged';

export interface DiffLineEntry {
  type: DiffLineType;
  text: string;
}

export interface DiffResult {
  lines: DiffLineEntry[];
  added: number;
  removed: number;
}

/**
 * Split a diffLines `value` chunk into its constituent lines.
 * A chunk ending in '\n' represents whole lines; drop the trailing empty
 * string `split('\n')` would otherwise produce. A chunk with no trailing
 * '\n' means its last line is the final line of the whole input (no
 * newline at end of file) — keep it as-is.
 */
function splitIntoLines(value: string): string[] {
  if (value === '') return [];
  const trimmed = value.endsWith('\n') ? value.slice(0, -1) : value;
  return trimmed.split('\n');
}

/** Compute a line-level diff between two texts, plus added/removed line counts. */
export function computeDiff(original: string, changed: string): DiffResult {
  // ignoreNewlineAtEof: without it, a text's last line (no trailing '\n') never
  // matches the "same" line when it appears mid-file in the other text (mid-file
  // lines keep their trailing '\n' as part of the token) — e.g. appending a line
  // would otherwise show the previous last line as removed-then-re-added instead
  // of unchanged. This matches how e.g. `git diff` treats a missing final newline.
  const changes = diffLines(original, changed, { ignoreNewlineAtEof: true });
  const lines: DiffLineEntry[] = [];
  let added = 0;
  let removed = 0;

  for (const part of changes) {
    const type: DiffLineType = part.added ? 'added' : part.removed ? 'removed' : 'unchanged';
    const partLines = splitIntoLines(part.value);
    if (type === 'added') added += partLines.length;
    if (type === 'removed') removed += partLines.length;
    for (const text of partLines) lines.push({ type, text });
  }

  return { lines, added, removed };
}

/** Render a diff as a unified, copyable text block ("+ line" / "- line" / "  line"). */
export function formatUnifiedDiff(result: DiffResult): string {
  return result.lines
    .map((l) => `${l.type === 'added' ? '+' : l.type === 'removed' ? '-' : ' '} ${l.text}`)
    .join('\n');
}

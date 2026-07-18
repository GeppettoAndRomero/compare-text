/**
 * Accept-list for the optional drag-and-drop-a-file-into-a-side bonus (issue #70).
 * compare-text has no *required* file input (both sides are pasted/typed text), so this
 * is intentionally small: plain-text-ish files a browser can safely read with FileReader
 * and treat as text.
 */
const ALLOWED_EXTENSIONS = ['.txt', '.md', '.markdown', '.log', '.csv'];
const ALLOWED_MIME_PREFIX = 'text/';

export function isAcceptedTextFile(file: File): boolean {
  if (file.type && file.type.startsWith(ALLOWED_MIME_PREFIX)) return true;
  const dot = file.name.lastIndexOf('.');
  if (dot < 0) return false;
  return ALLOWED_EXTENSIONS.includes(file.name.slice(dot).toLowerCase());
}

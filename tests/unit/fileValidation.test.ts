import { describe, it, expect } from 'vitest';
import { isAcceptedTextFile } from '@/utils/fileValidation';

// Minimal File-like stub (only the fields the validator reads).
const f = (name: string, type = ''): File => ({ name, type }) as unknown as File;

describe('isAcceptedTextFile', () => {
  it('accepts common plain-text extensions regardless of case, even with no MIME type', () => {
    for (const ext of ['.txt', '.TXT', '.md', '.markdown', '.log', '.csv']) {
      expect(isAcceptedTextFile(f(`notes${ext}`))).toBe(true);
    }
  });

  it('accepts anything the browser reports as text/*, even with an unlisted extension', () => {
    expect(isAcceptedTextFile(f('data.yaml', 'text/yaml'))).toBe(true);
  });

  it('rejects a non-text extension with no MIME type', () => {
    expect(isAcceptedTextFile(f('photo.jpg'))).toBe(false);
    expect(isAcceptedTextFile(f('archive.zip'))).toBe(false);
  });

  it('rejects a file with no extension and no MIME type', () => {
    expect(isAcceptedTextFile(f('README'))).toBe(false);
  });
});

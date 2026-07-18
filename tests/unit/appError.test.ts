import { describe, it, expect } from 'vitest';
import { AppError, resolveErrorMessage } from '@/utils/appError';
import { ui } from '@/i18n/ui';

describe('resolveErrorMessage', () => {
  it('maps codes to localized strings', () => {
    expect(resolveErrorMessage('errFileReadFailed', ui.en)).toBe('Could not read that file.');
    expect(resolveErrorMessage('errFileReadFailed', ui.ja)).toBe('このファイルを読み込めませんでした。');
    expect(resolveErrorMessage(new AppError('errCopyFailed'), ui.de)).toBe(
      'Kopieren in die Zwischenablage fehlgeschlagen.'
    );
  });

  it('interpolates params (e.g. an unsupported file name)', () => {
    expect(resolveErrorMessage(new AppError('errUnsupportedFile', { name: 'photo.jpg' }), ui.en)).toBe(
      'Not a text file (photo.jpg).'
    );
  });

  it('falls back to the localized generic message for unmapped English/undefined errors', () => {
    expect(resolveErrorMessage('DOMException: Document is not focused.', ui.zh)).toBe(ui.zh.errConversionFailed);
    expect(resolveErrorMessage(undefined, ui.es)).toBe(ui.es.errConversionFailed);
  });

  it('every locale defines the mapped codes', () => {
    for (const loc of ['en', 'ja', 'zh', 'de', 'es'] as const)
      for (const c of ['errUnsupportedFile', 'errFileReadFailed', 'errCopyFailed', 'errConversionFailed'])
        expect((ui as any)[loc][c], `${loc}.${c}`).toBeTruthy();
  });
});

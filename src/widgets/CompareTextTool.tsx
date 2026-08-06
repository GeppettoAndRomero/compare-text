/**
 * CompareTextTool
 * Two textareas ("Original" / "Changed") diffed line-by-line, entirely client-side.
 * Line granularity only for this MVP — no word/character diff (issue #70 scope).
 *
 * Diffing is debounced off the raw textarea state so typing stays instant even while a
 * large input is being diffed, and so the diff (and its aria-live summary) doesn't
 * recompute/announce on every keystroke.
 *
 * Each diff row carries a literal '+' / '-' / ' ' marker as real (non aria-hidden) text,
 * not just a background color, so added/removed lines are distinguishable without color
 * (screen readers, color-blind users, printouts).
 */
import { useState, useEffect, useMemo, useCallback, useRef } from 'preact/hooks';
import { AppCard } from './AppCard';
import { AppModal } from './AppModal';
import { ErrorToast } from './ErrorToast';
import { FullscreenShell } from './FullscreenShell';
import { computeDiff, formatUnifiedDiff, type DiffLineType } from '@/utils/diffEngine';
import { isLargeText } from '@/utils/textSize';
import { isAcceptedTextFile } from '@/utils/fileValidation';
import { resolveErrorMessage } from '@/utils/appError';
import { ui } from '@/i18n/ui';

interface ErrorToastItem {
  id: string;
  message: string;
}

interface CompareTextToolProps {
  locale?: string;
}

type Side = 'original' | 'changed';

const DIFF_DEBOUNCE_MS = 150;
// Safety net, not a hard product limit: with a genuinely huge diff (e.g. both sides
// mostly unique), rendering one DOM row per line can bog the browser down even though
// diffLines itself stayed fast. Cap what's *rendered*; the copy button still copies the
// full unified diff, and the added/removed summary is always exact (never truncated).
const MAX_RENDERED_LINES = 20_000;

const markerFor = (type: DiffLineType): string => (type === 'added' ? '+' : type === 'removed' ? '-' : ' ');

export function CompareTextTool({ locale = 'en' }: CompareTextToolProps) {
  const t = (ui as any)[locale] ?? ui.en;
  const [original, setOriginal] = useState('');
  const [changed, setChanged] = useState('');
  const [debounced, setDebounced] = useState({ original: '', changed: '' });
  const [copied, setCopied] = useState(false);
  const [dragOverSide, setDragOverSide] = useState<Side | null>(null);
  const [errorToasts, setErrorToasts] = useState<ErrorToastItem[]>([]);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fullscreen editing session (#116, Tier 1). Like edit-markdown-table,
  // this tool has no natural "nothing loaded yet" state (both panes are
  // live, empty textareas from first render), so entering fullscreen is an
  // explicit "Expand" action. Closing discards both texts (D4,
  // editor/confirm-if-dirty) — "dirty" is simply hasContent, since there is
  // no import-vs-edited distinction to track here.
  const [expanded, setExpanded] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);

  const showErrorToast = useCallback((message: string) => {
    const id = `error-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    setErrorToasts((prev) => [...prev, { id, message }]);
  }, []);
  const removeErrorToast = useCallback((id: string) => {
    setErrorToasts((prev) => prev.filter((e) => e.id !== id));
  }, []);

  useEffect(() => {
    (globalThis as Record<string, unknown>).__toolReady = true;
  }, []);

  // Debounce the diff itself, not the textareas (which must stay instantly responsive).
  useEffect(() => {
    const id = setTimeout(() => setDebounced({ original, changed }), DIFF_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [original, changed]);

  useEffect(() => () => {
    if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
  }, []);

  const diff = useMemo(() => computeDiff(debounced.original, debounced.changed), [debounced]);
  const hasContent = original.length > 0 || changed.length > 0;
  const showLargeWarning = isLargeText(original) || isLargeText(changed);
  const visibleLines = diff.lines.length > MAX_RENDERED_LINES ? diff.lines.slice(0, MAX_RENDERED_LINES) : diff.lines;
  const truncated = diff.lines.length > MAX_RENDERED_LINES;

  const handleClear = () => {
    setOriginal('');
    setChanged('');
    setCopied(false);
  };

  // ---- fullscreen editing session (#116) --------------------------------

  const requestCloseEditor = () => {
    if (hasContent) setConfirmClose(true);
    else setExpanded(false);
  };

  const handleRequestClose = () => {
    if (confirmClose) setConfirmClose(false);
    else requestCloseEditor();
  };

  const performCloseDiscard = () => {
    handleClear();
    setConfirmClose(false);
    setExpanded(false);
  };

  const handleCopy = useCallback(async () => {
    const unified = formatUnifiedDiff(diff);
    try {
      await navigator.clipboard.writeText(unified);
      setCopied(true);
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      showErrorToast(t.errCopyFailed ?? resolveErrorMessage(error, t));
    }
  }, [diff, t, showErrorToast]);

  const loadFileInto = useCallback(
    (side: Side, file: File) => {
      if (!isAcceptedTextFile(file)) {
        showErrorToast(t.errUnsupportedFile.replace('{name}', file.name));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const text = typeof reader.result === 'string' ? reader.result : '';
        if (side === 'original') setOriginal(text);
        else setChanged(text);
      };
      reader.onerror = () => showErrorToast(t.errFileReadFailed);
      reader.readAsText(file);
    },
    [showErrorToast, t]
  );

  const dropHandlers = (side: Side) => ({
    onDragOver: (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOverSide(side);
    },
    onDragLeave: (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOverSide((s) => (s === side ? null : s));
    },
    onDrop: (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOverSide(null);
      const file = e.dataTransfer?.files?.[0];
      if (file) loadFileInto(side, file);
    },
  });

  const summaryText = t.summary
    .replace('{added}', String(diff.added))
    .replace('{removed}', String(diff.removed));

  // Both panes + toolbar + diff result — rendered inline in the normal
  // column when not expanded, or as FullscreenShell's children when
  // expanded (#116). Same JSX either way; only the wrapper differs.
  const editorBody = (
    <>
      <AppCard>
        <div class="ct-grid">
          <div class="ct-field">
            <label class="app-field__label" for="ct-original">
              {t.originalLabel}
            </label>
            <textarea
              id="ct-original"
              class={`app-field__textarea ct-textarea ${dragOverSide === 'original' ? 'ct-textarea--dragover' : ''}`}
              value={original}
              onInput={(e) => setOriginal((e.target as HTMLTextAreaElement).value)}
              placeholder={t.originalPlaceholder}
              spellcheck={false}
              autocomplete="off"
              {...dropHandlers('original')}
            />
          </div>
          <div class="ct-field">
            <label class="app-field__label" for="ct-changed">
              {t.changedLabel}
            </label>
            <textarea
              id="ct-changed"
              class={`app-field__textarea ct-textarea ${dragOverSide === 'changed' ? 'ct-textarea--dragover' : ''}`}
              value={changed}
              onInput={(e) => setChanged((e.target as HTMLTextAreaElement).value)}
              placeholder={t.changedPlaceholder}
              spellcheck={false}
              autocomplete="off"
              {...dropHandlers('changed')}
            />
          </div>
        </div>

        {showLargeWarning && (
          <p role="status" class="ct-warning">
            {t.largeInputWarning}
          </p>
        )}

        <div class="ct-toolbar">
          <span id="ct-summary" class="num" role="status">
            {summaryText}
          </span>
          <span class="ct-toolbar__actions">
            {!expanded && (
              <button type="button" id="expand-editor-action" class="app-button app-button--secondary" onClick={() => setExpanded(true)}>
                {t.expandEditor}
              </button>
            )}
            <button
              type="button"
              id="clear-action"
              class="app-button app-button--secondary"
              onClick={handleClear}
              disabled={!hasContent}
            >
              {t.clearAll}
            </button>
            <button
              type="button"
              id="copy-action"
              class="app-button app-button--primary"
              onClick={handleCopy}
              disabled={diff.lines.length === 0}
            >
              {copied ? t.copied : t.copyDiff}
            </button>
          </span>
        </div>
      </AppCard>

      <AppCard className="ct-result-card">
        <h3 class="ct-result-heading">{t.diffHeading}</h3>
        {diff.lines.length === 0 ? (
          <p class="ct-empty">{t.diffEmpty}</p>
        ) : (
          <>
            <div class="ct-diff" aria-label={t.diffAria} role="group" id="diff-output">
              {visibleLines.map((line, i) => (
                <div key={i} class={`ct-diff-line ct-diff-line--${line.type}`}>
                  <span class="ct-diff-marker">{markerFor(line.type)}</span>
                  <span class="ct-diff-text">{line.text.length ? line.text : ' '}</span>
                </div>
              ))}
            </div>
            {truncated && (
              <p class="ct-warning">
                {t.truncatedNotice
                  .replace('{shown}', String(visibleLines.length))
                  .replace('{total}', String(diff.lines.length))}
              </p>
            )}
          </>
        )}
      </AppCard>
    </>
  );

  return (
    <div>
      {!expanded && editorBody}

      {expanded && (
        <FullscreenShell
          open={expanded}
          onRequestClose={handleRequestClose}
          label={t.editorAria}
          closeLabel={t.closeEditor}
          testId="editor"
          closeTestId="close-editor"
        >
          {editorBody}
        </FullscreenShell>
      )}

      <AppModal isOpen={confirmClose} onClose={() => setConfirmClose(false)} title={t.closeConfirmTitle} locale={locale}>
        <p>{t.closeConfirmBody}</p>
        <div style="display: flex; gap: var(--space-2); justify-content: flex-end; margin-top: var(--space-4);">
          <button type="button" class="app-button app-button--ghost" onClick={() => setConfirmClose(false)}>
            {t.closeConfirmCancel}
          </button>
          <button id="confirm-close-editor-action" type="button" class="app-button app-button--primary" onClick={performCloseDiscard}>
            {t.closeConfirmConfirm}
          </button>
        </div>
      </AppModal>

      {errorToasts.length > 0 && (
        <div className="error-toast-container" aria-label={t.notificationsAria}>
          {errorToasts.map((toast) => (
            <ErrorToast key={toast.id} id={toast.id} message={toast.message} onClose={removeErrorToast} locale={locale} />
          ))}
        </div>
      )}

      <style>{`
        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-4);
          margin-bottom: var(--space-4);
        }
        @media (max-width: 720px) {
          .ct-grid {
            grid-template-columns: 1fr;
          }
        }
        .ct-field {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .ct-textarea {
          width: 100%;
          min-height: 260px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: var(--fs-2);
          line-height: var(--lh-normal);
          resize: vertical;
        }
        .ct-textarea--dragover {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px var(--color-primary-alpha);
        }
        .ct-warning {
          margin: 0 0 var(--space-3) 0;
          padding: var(--space-2) var(--space-3);
          background: color-mix(in srgb, var(--color-warning) 15%, var(--color-bg));
          border: 1px solid var(--color-warning);
          border-radius: var(--radius-sm);
          font-size: var(--fs-1);
          color: var(--color-text);
        }
        .ct-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-3);
          flex-wrap: wrap;
        }
        .ct-toolbar__actions {
          display: flex;
          gap: var(--space-2);
        }
        .ct-result-card {
          margin-top: var(--space-6);
        }
        .ct-result-heading {
          margin: 0 0 var(--space-3) 0;
          font-size: var(--fs-4);
          font-weight: 600;
        }
        .ct-empty {
          margin: 0;
          color: var(--color-subtle);
          font-size: var(--fs-2);
        }
        .ct-diff {
          font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
          font-size: var(--fs-2);
          line-height: var(--lh-normal);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          overflow-x: auto;
        }
        .ct-diff-line {
          display: flex;
          gap: var(--space-2);
          padding-inline: var(--space-3);
          white-space: pre-wrap;
          word-break: break-word;
        }
        .ct-diff-marker {
          flex: 0 0 auto;
          font-weight: 700;
          user-select: none;
        }
        .ct-diff-text {
          flex: 1 1 auto;
        }
        .ct-diff-line--unchanged {
          background: var(--color-bg);
          color: var(--color-subtle);
        }
        .ct-diff-line--added {
          background: color-mix(in srgb, var(--color-success) 12%, var(--color-bg));
        }
        .ct-diff-line--added .ct-diff-marker {
          color: var(--color-success);
        }
        .ct-diff-line--removed {
          background: color-mix(in srgb, var(--color-danger) 12%, var(--color-bg));
        }
        .ct-diff-line--removed .ct-diff-marker {
          color: var(--color-danger);
        }
        .ct-diff-line--removed .ct-diff-text {
          text-decoration: line-through;
        }
      `}</style>
    </div>
  );
}

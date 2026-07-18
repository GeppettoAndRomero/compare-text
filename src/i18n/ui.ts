/**
 * Preact アイランド（クライアント UI）の文言。ロケール別。
 * ページレベル content (`en.ts` / `ja.ts`) とは別に、インタラクティブな
 * アイランドが表示する文字列をここに集約する。
 *
 * 重要: アイランドは locale を PROP で受け取り（SSR 時に存在）、
 * `document` 等から読まない。SSR とクライアントで同一文字列を描画して
 * hydration mismatch を防ぐ。
 *
 * 補間文字列は `{added}` / `{name}` のテンプレートを持ち、
 * アイランド側で `.replace('{added}', x)` する。
 */
export const ui = {
  en: {
    // CompareTextTool
    originalLabel: 'Original',
    changedLabel: 'Changed',
    originalPlaceholder: 'Paste or type the original text, or drop a .txt file…',
    changedPlaceholder: 'Paste or type the changed text, or drop a .txt file…',
    largeInputWarning:
      'One of these texts is large (~5MB+). Comparing it may take a moment and typing may feel less responsive.',
    summary: '+{added} lines added, -{removed} lines removed',
    diffHeading: 'Diff',
    diffAria: 'Line-by-line diff result',
    diffEmpty: 'Paste text on both sides to see the difference.',
    truncatedNotice: 'Showing the first {shown} of {total} lines — the diff is very large.',
    copyDiff: 'Copy diff',
    copied: 'Copied',
    clearAll: 'Clear both',
    notificationsAria: 'Notifications',
    errUnsupportedFile: 'Not a text file ({name}).',
    errFileReadFailed: 'Could not read that file.',
    errCopyFailed: 'Could not copy to the clipboard.',
    errConversionFailed: 'Something went wrong.',

    // InstallPrompt
    installHeading: 'Install app',
    installBody: 'Add to your home screen for quick access.',
    install: 'Install',
    later: 'Later',

    // ThemeToggle
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    themeLabel: 'Theme',

    // shared
    close: 'Close',
    required: 'Required',
  },
  ja: {
    // CompareTextTool
    originalLabel: '変更前',
    changedLabel: '変更後',
    originalPlaceholder: '変更前のテキストを貼り付け・入力、または .txt をドロップ…',
    changedPlaceholder: '変更後のテキストを貼り付け・入力、または .txt をドロップ…',
    largeInputWarning:
      'どちらかのテキストが大きいです（約5MB以上）。比較に時間がかかり、入力の反応が鈍くなる場合があります。',
    summary: '+{added} 行追加、-{removed} 行削除',
    diffHeading: '差分',
    diffAria: '行単位の差分結果',
    diffEmpty: '両方にテキストを貼り付けると、差分が表示されます。',
    truncatedNotice: '{total} 行中 {shown} 行を表示しています（差分が非常に大きいため省略）。',
    copyDiff: '差分をコピー',
    copied: 'コピーしました',
    clearAll: '両方クリア',
    notificationsAria: '通知',
    errUnsupportedFile: 'テキストファイルではありません（{name}）。',
    errFileReadFailed: 'このファイルを読み込めませんでした。',
    errCopyFailed: 'クリップボードにコピーできませんでした。',
    errConversionFailed: '問題が発生しました。',

    // InstallPrompt
    installHeading: 'アプリを追加',
    installBody: 'ホーム画面に追加すると、すぐに開けます。',
    install: '追加',
    later: 'あとで',

    // ThemeToggle
    themeToLight: 'ライトモードに切り替え',
    themeToDark: 'ダークモードに切り替え',
    themeLabel: 'テーマ',

    // shared
    close: '閉じる',
    required: '必須',
  },
  zh: {
    // CompareTextTool
    originalLabel: '原文',
    changedLabel: '修改后',
    originalPlaceholder: '粘贴或输入原文，或拖入 .txt 文件…',
    changedPlaceholder: '粘贴或输入修改后的文本，或拖入 .txt 文件…',
    largeInputWarning: '其中一段文本较大（约 5MB 以上）。比较可能需要一点时间，输入时也可能感觉不够流畅。',
    summary: '+{added} 行新增，-{removed} 行删除',
    diffHeading: '差异',
    diffAria: '逐行差异结果',
    diffEmpty: '在两侧都粘贴文本后即可看到差异。',
    truncatedNotice: '共 {total} 行，仅显示前 {shown} 行（差异过大，已省略部分内容）。',
    copyDiff: '复制差异',
    copied: '已复制',
    clearAll: '清空两侧',
    notificationsAria: '通知',
    errUnsupportedFile: '不是文本文件（{name}）。',
    errFileReadFailed: '无法读取该文件。',
    errCopyFailed: '无法复制到剪贴板。',
    errConversionFailed: '出了点问题。',

    // InstallPrompt
    installHeading: '安装应用',
    installBody: '添加到主屏幕，方便随时打开。',
    install: '安装',
    later: '以后再说',

    // ThemeToggle
    themeToLight: '切换到浅色模式',
    themeToDark: '切换到深色模式',
    themeLabel: '主题',

    // shared
    close: '关闭',
    required: '必填',
  },
  de: {
    // CompareTextTool
    originalLabel: 'Original',
    changedLabel: 'Geändert',
    originalPlaceholder: 'Originaltext einfügen/eingeben oder .txt-Datei ablegen…',
    changedPlaceholder: 'Geänderten Text einfügen/eingeben oder .txt-Datei ablegen…',
    largeInputWarning:
      'Einer der Texte ist groß (~5MB+). Der Vergleich kann einen Moment dauern, und die Eingabe kann sich weniger flüssig anfühlen.',
    summary: '+{added} Zeilen hinzugefügt, -{removed} Zeilen entfernt',
    diffHeading: 'Diff',
    diffAria: 'Zeilenweises Diff-Ergebnis',
    diffEmpty: 'Füge auf beiden Seiten Text ein, um den Unterschied zu sehen.',
    truncatedNotice: 'Zeigt die ersten {shown} von {total} Zeilen — der Diff ist sehr groß.',
    copyDiff: 'Diff kopieren',
    copied: 'Kopiert',
    clearAll: 'Beide leeren',
    notificationsAria: 'Benachrichtigungen',
    errUnsupportedFile: 'Keine Textdatei ({name}).',
    errFileReadFailed: 'Diese Datei konnte nicht gelesen werden.',
    errCopyFailed: 'Kopieren in die Zwischenablage fehlgeschlagen.',
    errConversionFailed: 'Etwas ist schiefgelaufen.',

    // InstallPrompt
    installHeading: 'App installieren',
    installBody: 'Zum Startbildschirm hinzufügen, um es direkt zu öffnen.',
    install: 'Installieren',
    later: 'Später',

    // ThemeToggle
    themeToLight: 'Zum hellen Modus wechseln',
    themeToDark: 'Zum dunklen Modus wechseln',
    themeLabel: 'Design',

    // shared
    close: 'Schließen',
    required: 'Erforderlich',
  },
  es: {
    // CompareTextTool
    originalLabel: 'Original',
    changedLabel: 'Modificado',
    originalPlaceholder: 'Pega o escribe el texto original, o suelta un archivo .txt…',
    changedPlaceholder: 'Pega o escribe el texto modificado, o suelta un archivo .txt…',
    largeInputWarning:
      'Uno de estos textos es grande (~5MB o más). Compararlo puede tardar un momento y la escritura puede sentirse menos fluida.',
    summary: '+{added} líneas añadidas, -{removed} líneas eliminadas',
    diffHeading: 'Diferencias',
    diffAria: 'Resultado de la comparación línea por línea',
    diffEmpty: 'Pega texto en ambos lados para ver la diferencia.',
    truncatedNotice: 'Mostrando las primeras {shown} de {total} líneas — la diferencia es muy grande.',
    copyDiff: 'Copiar diferencias',
    copied: 'Copiado',
    clearAll: 'Vaciar ambos',
    notificationsAria: 'Notificaciones',
    errUnsupportedFile: 'No es un archivo de texto ({name}).',
    errFileReadFailed: 'No se pudo leer ese archivo.',
    errCopyFailed: 'No se pudo copiar al portapapeles.',
    errConversionFailed: 'Algo salió mal.',

    // InstallPrompt
    installHeading: 'Instalar la app',
    installBody: 'Añádela a tu pantalla de inicio para tenerla siempre a mano.',
    install: 'Instalar',
    later: 'Más tarde',

    // ThemeToggle
    themeToLight: 'Cambiar al modo claro',
    themeToDark: 'Cambiar al modo oscuro',
    themeLabel: 'Tema',

    // shared
    close: 'Cerrar',
    required: 'Obligatorio',
  },
} as const;

export type UiStrings = (typeof ui)['en'];

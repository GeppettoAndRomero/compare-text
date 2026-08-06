import type { ToolContent } from './types';

// Deutsch. Keine Wort-für-Wort-Übersetzung, sondern Transkreation auf Basis der
// Begriffe und Wendungen, die deutsche Diff-/Textvergleich-Tools tatsächlich verwenden.
// Keine Werbefloskeln (einfach / schnell / kinderleicht / perfekt) — Datenschutz
// wird strukturell begründet, nicht versprochen (BRAND-OPERATING-MODEL /
// I18N-SEO-GUIDELINE). Register: informelles „du", wie bei kostenlosen Browser-Tools üblich.

export const de: ToolContent = {
  htmlLang: 'de',

  meta: {
    title: 'Zwei Texte vergleichen — Zeilen-Diff im Browser, ohne Upload | runlocally',
    description:
      'Füge zwei Texte ein und sieh dir einen zeilenweisen Diff an: hinzugefügte, entfernte und unveränderte Zeilen werden hervorgehoben, inklusive laufender +/- Zeilenzahl. Läuft komplett im Browser, nichts wird hochgeladen.',
    ogTitle: 'Zwei Texte vergleichen — Zeilen-Diff im Browser',
    ogDescription: 'Füge zwei Texte ein und sieh den zeilenweisen Diff direkt im Browser. Nichts wird hochgeladen.',
  },

  hero: {
    h1: 'Text vergleichen',
    tagline:
      'Füge zwei Texte ein und sieh dir einen zeilenweisen Diff an — hinzugefügte, entfernte und unveränderte Zeilen werden hervorgehoben. Nichts verlässt deinen Browser.',
  },

  intro: {
    h2: 'Ein zeilenweiser Diff, komplett im Browser',
    paras: [
      'Füge eine Original- und eine geänderte Version eines beliebigen Texts ein — Code, einen Vertrag, Notizen, eine Konfigurationsdatei — und dieses Tool markiert, welche Zeilen hinzugefügt, entfernt oder unverändert geblieben sind. Der Vergleich erfolgt zeilenweise, nicht wort- oder zeichenweise, was das Ergebnis bei den meisten alltäglichen Änderungen leicht überschaubar macht.',
      'Es gibt eine laufende Zählung der hinzugefügten und entfernten Zeilen sowie eine Ein-Klick-Kopie des vollständigen Diffs, damit du ihn anderswo einfügen kannst — in einen Code-Review-Kommentar, eine E-Mail oder deine Notizen.',
    ],
  },

  privacy: {
    h2: 'Warum dein Text auf dem Gerät bleibt',
    lead: 'Datenschutz ist hier strukturell, kein Versprechen. Es gibt keinen Upload-Schritt, weil es keinen Server gibt, zu dem etwas hochgeladen werden könnte:',
    points: [
      'Der Vergleich läuft vollständig in deinem Browser.',
      'Die Seite wird als statische Dateien ausgeliefert und sendet keine Anfrage mit einem der eingefügten Texte.',
      'Der Quellcode ist offen und kann von allen eingesehen werden (MIT).',
      'Die Seite funktioniert offline – was nur möglich ist, weil nichts das Gerät verlässt.',
    ],
    note: 'Wenn du es selbst prüfen willst, öffne beim Vergleichen das Netzwerk-Panel deines Browsers – keine Anfrage trägt deinen Text.',
    sourceLinkText: 'Quellcode ansehen.',
  },

  howto: {
    h2: 'So funktioniert es',
    steps: [
      {
        h3: 'Original einfügen',
        p: 'Füge die Ausgangsversion deines Texts in das Feld „Original" ein oder tippe sie ein.',
      },
      {
        h3: 'Geänderte Version einfügen',
        p: 'Füge die aktualisierte Version in das Feld „Geändert" ein. Der Diff aktualisiert sich beim Tippen.',
      },
      {
        h3: 'Hervorgehobenen Diff lesen',
        p: 'Hinzugefügte Zeilen sind mit einem führenden + auf grünem Hintergrund markiert; entfernte Zeilen mit einem führenden - auf rotem, durchgestrichenem Hintergrund; unveränderte Zeilen bleiben schlicht.',
      },
      {
        h3: 'Kopieren oder leeren',
        p: 'Kopiere den vollständigen Diff mit einem Klick in die Zwischenablage, oder leere beide Felder, um neu zu beginnen.',
      },
    ],
  },

  faqHeading: 'Häufige Fragen',
  faq: [
    {
      q: 'Wird mein Text irgendwohin hochgeladen?',
      a: 'Nein. Der Vergleich läuft vollständig in deinem Browser. Es gibt keine Serverkomponente, also gibt es für deinen Text keinen Weg vom Gerät. Der Quellcode ist offen und du kannst das im Netzwerk-Panel deines Browsers nachprüfen.',
    },
    {
      q: 'Vergleicht es wort- oder zeichenweise?',
      a: 'Nein — dieses Tool vergleicht ausschließlich zeilenweise. Ein einzelnes geändertes Wort in einer langen Zeile zeigt die ganze Zeile als entfernt und neu hinzugefügt, statt nur das Wort hervorzuheben. Ein Wort- oder Zeichen-Diff ist eine mögliche zukünftige Erweiterung, aber heute nicht Teil dieses Tools.',
    },
    {
      q: 'Gibt es ein Größenlimit?',
      a: 'Es gibt kein festes Limit. Ein sehr großer Text (etwa 5MB oder mehr) zeigt einen kurzen Hinweis, da der Vergleich und die Darstellung so großer Textmengen einen Moment dauern können und sich die Eingabe dabei weniger flüssig anfühlen kann – der Vergleich läuft dabei aber weiterhin vollständig auf deinem Gerät.',
    },
    {
      q: 'Kann ich eine Datei ablegen statt einzufügen?',
      a: 'Ja — lege eine reine Textdatei (.txt, .md, .log, .csv) auf einem der beiden Felder ab, und ihr Inhalt wird dort geladen. Das ist eine Ergänzung zum Einfügen oder Eintippen, keine Voraussetzung.',
    },
    {
      q: 'Funktioniert es offline?',
      a: 'Ja. Das Tool ist eine PWA. Nach dem ersten Besuch wird es zwischengespeichert, sodass es ohne Netzwerkverbindung funktioniert. Du kannst es auch zum Startbildschirm hinzufügen.',
    },
    {
      q: 'Was zählt in der Übersicht als „hinzugefügte" oder „entfernte" Zeile?',
      a: 'Jede Zeile, die im geänderten Text vorkommt, aber nicht an dieser Stelle im Original, zählt als hinzugefügt; jede Zeile, die im Original vorkommt, aber nicht im geänderten Text, zählt als entfernt. Zeilen, die in beiden Texten in derselben Reihenfolge vorkommen, sind unverändert und zählen in keine Richtung.',
    },
  ],

  footer: {
    openSourceLabel: 'Open Source (MIT)',
    partOf: 'Teil von',
    brandTail: '— kleine Tools, die lokal auf deinem Gerät laufen.',
    colophon:
      'Erstellt und gepflegt von Geppetto. Ein Teil des Codes entsteht mit KI-Unterstützung; Prüfung und Entscheidungen liegen beim Maintainer.',
    securityText: 'Sicherheit',
  },

  related: {
    h2: 'Ähnliche Tools',
    blogLinkText: 'Technische Hintergründe lesen',
  },
};

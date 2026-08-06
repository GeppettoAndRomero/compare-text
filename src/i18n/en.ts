import type { ToolContent } from './types';

export const en: ToolContent = {
  htmlLang: 'en',

  meta: {
    title: 'Compare Two Texts — Line Diff in Your Browser, No Upload | runlocally',
    description:
      'Paste two texts and see a line-by-line diff: added, removed, and unchanged lines highlighted, with a live +/- line count. Runs entirely in your browser. Nothing is uploaded.',
    ogTitle: 'Compare Two Texts — Line Diff in Your Browser',
    ogDescription:
      'Paste two texts and see a line-by-line diff, highlighted and counted, right in your browser. Nothing is uploaded.',
  },

  hero: {
    h1: 'Compare Text',
    tagline:
      'Paste two texts and see a line-by-line diff — added, removed, and unchanged lines highlighted. Nothing leaves your browser.',
  },

  intro: {
    h2: 'A line-by-line diff, entirely in your browser',
    paras: [
      "Paste an original and a changed version of any text — code, a contract, notes, a config file — and this tool highlights which lines were added, removed, or left unchanged. Comparison is line by line, not word or character by word or character, which keeps the result easy to scan for most everyday edits.",
      'There is a live count of lines added and removed, and a one-click copy of the full diff so you can paste it elsewhere — into a code review comment, an email, or your notes.',
    ],
  },

  privacy: {
    h2: 'Why your text stays on your device',
    lead: 'Privacy here is structural, not a promise. There is no upload step because there is no server to upload to:',
    points: [
      'The comparison runs entirely in your browser.',
      'The page is served as static files and makes no request with either text you paste.',
      'The source is open and anyone can read it (MIT).',
      'It works offline, which is only possible because nothing leaves the device.',
    ],
    note: "If you want to check for yourself, open your browser's Network panel while comparing — no request carries your text.",
    sourceLinkText: 'Read the source.',
  },

  howto: {
    h2: 'How to use it',
    steps: [
      {
        h3: 'Paste the original',
        p: 'Paste or type the starting version of your text into the Original box.',
      },
      {
        h3: 'Paste the changed version',
        p: 'Paste or type the updated version into the Changed box. The diff updates as you type.',
      },
      {
        h3: 'Read the highlighted diff',
        p: 'Added lines are marked with a leading + on a green background; removed lines with a leading - on a red, struck-through background; unchanged lines are left plain.',
      },
      {
        h3: 'Copy or clear',
        p: 'Copy the full diff to your clipboard with one click, or clear both boxes to start over.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Is my text uploaded anywhere?',
      a: "No. The comparison runs entirely in your browser. There is no server component, so your text has no path off your device. The source is open and you can confirm this in your browser's Network panel.",
    },
    {
      q: 'Does it compare word by word or character by character?',
      a: 'No — this tool compares line by line only. A single changed word inside a long line shows the whole line as removed and re-added, rather than highlighting just that word. Word- and character-level diffing are a possible future addition, not part of this tool today.',
    },
    {
      q: 'Is there a size limit?',
      a: "There's no hard limit. A very large text (roughly 5MB or more) shows a brief warning, since comparing and rendering that much text can take a moment and typing may feel less responsive — but the comparison still runs, entirely on your device.",
    },
    {
      q: 'Can I drop in a file instead of pasting?',
      a: 'Yes — drop a plain-text file (.txt, .md, .log, .csv) onto either box and its contents load into that side. This is a convenience on top of pasting or typing, not a requirement.',
    },
    {
      q: 'Does it work offline?',
      a: 'Yes. It is a PWA. After the first visit it is cached, so it works without a network connection. You can also install it to your home screen.',
    },
    {
      q: "What counts as an 'added' or 'removed' line in the summary?",
      a: "Each line present in the changed text but not at that point in the original counts as added; each line present in the original but not in the changed text counts as removed. Lines that appear in both, in the same order, are unchanged and don't count either way.",
    },
  ],

  footer: {
    openSourceLabel: 'Open source (MIT)',
    partOf: 'part of',
    brandTail: '— small tools that run locally on your device.',
    colophon:
      "Built and maintained by Geppetto. Some code is written with AI assistance; all review and decisions are the maintainer's.",
    securityText: 'Security',
  },

  related: {
    h2: 'Related tools',
    blogLinkText: 'Read the technical notes',
  },
};

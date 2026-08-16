const fs = require('fs');
const path = require('path');
const projectDir = path.resolve(__dirname, '../grupo-educacional-san-amaro/project');

const MOBILE_CSS = `
    @media (max-width: 700px) {
      .sa-sub-navlinks { display: none !important; }
    }
    @media (max-width: 900px) {
      .sa-footer-grid { grid-template-columns: 1fr 1fr !important; padding: 40px 24px 20px !important; row-gap: 32px !important; }
      .sa-footer-grid > div:first-child { grid-column: 1 / -1 !important; }
      .sa-sub-grid-2 { grid-template-columns: 1fr !important; gap: 40px !important; }
      .sa-sub-grid-3 { grid-template-columns: 1fr 1fr !important; }
    }
    @media (max-width: 640px) {
      .sa-footer-grid { grid-template-columns: 1fr !important; text-align: center; padding: 32px 24px 16px !important; }
      .sa-footer-grid > div { align-items: center !important; }
      .sa-footer-legal { flex-direction: column !important; align-items: flex-start !important; padding: 20px 24px !important; text-align: left; }
      .sa-sub-grid-3 { grid-template-columns: 1fr !important; }
      .sa-form-row2 { grid-template-columns: 1fr !important; gap: 16px !important; }
    }
`;

function replaceOnce(html, label, from, to) {
  if (html.indexOf(from) === -1) { console.log('MISS: ' + label); return html; }
  const count = html.split(from).length - 1;
  if (count > 1) console.log('WARN multiple (' + count + '): ' + label);
  console.log('OK: ' + label);
  return html.replace(from, to);
}

function process(fileName, edits) {
  const p = path.join(projectDir, fileName);
  let html = fs.readFileSync(p, 'utf8');
  console.log('--- ' + fileName + ' ---');

  for (const [label, from, to] of edits) {
    html = replaceOnce(html, label, from, to);
  }

  // Inject mobile CSS before closing </style> of the first <style> block
  const styleCloseIdx = html.indexOf('</style>');
  if (styleCloseIdx === -1) {
    console.log('MISS: </style> tag');
  } else {
    html = html.slice(0, styleCloseIdx) + MOBILE_CSS + html.slice(styleCloseIdx);
    console.log('OK: injected mobile CSS');
  }

  fs.writeFileSync(p, html, 'utf8');
}

const navLinksFrom = '<div style="display:flex;align-items:center;gap:28px;font-size:13px;color:rgba(0,0,0,0.5);">';
const navLinksTo = '<div class="sa-sub-navlinks" style="display:flex;align-items:center;gap:28px;font-size:13px;color:rgba(0,0,0,0.5);">';

const footerGridFrom1 = '<div style="padding:28px 56px 20px;display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:40px;">';
const footerGridTo1 = '<div class="sa-footer-grid" style="padding:28px 56px 20px;display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:40px;">';
const footerGridFrom2 = '<div style="padding:28px 56px 20px;display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:40px;flex-wrap:wrap;">';
const footerGridTo2 = '<div class="sa-footer-grid" style="padding:28px 56px 20px;display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:40px;flex-wrap:wrap;">';

const legalFrom = '<div style="padding:20px 56px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">';
const legalTo = '<div class="sa-footer-legal" style="padding:20px 56px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">';

process('Certificados.dc.html', [
  ['nav-links', navLinksFrom, navLinksTo],
  ['footer-grid', footerGridFrom1, footerGridTo1],
  ['legal-bar', legalFrom, legalTo],
]);

process('Inscripciones.dc.html', [
  ['nav-links', navLinksFrom, navLinksTo],
  ['main-2col-grid', '<div style="max-width:1100px;margin:0 auto;padding:0 48px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;">',
    '<div class="sa-sub-grid-2" style="max-width:1100px;margin:0 auto;padding:0 48px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;">'],
  ['form-row-grid', '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">',
    '<div class="sa-form-row2" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">'],
  ['footer-grid', footerGridFrom1, footerGridTo1],
  ['legal-bar', legalFrom, legalTo],
]);

process('Politicas Comerciales.dc.html', [
  ['nav-links', navLinksFrom, navLinksTo],
  ['footer-grid', footerGridFrom2, footerGridTo2],
  ['legal-bar', legalFrom, legalTo],
]);

process('Suscripciones.dc.html', [
  ['nav-links', navLinksFrom, navLinksTo],
  ['grid-3-a', '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:24px;">',
    '<div class="sa-sub-grid-3" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:24px;">'],
  ['grid-3-b', '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">',
    '<div class="sa-sub-grid-3" style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">'],
  ['footer-grid', footerGridFrom1, footerGridTo1],
  ['legal-bar', legalFrom, legalTo],
]);

console.log('DONE');

const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../grupo-educacional-san-amaro/project/San Amaro Landing.dc.html');
let html = fs.readFileSync(file, 'utf8');

function replaceOnce(label, from, to) {
  if (html.indexOf(from) === -1) { console.log('MISS: ' + label); return; }
  const count = html.split(from).length - 1;
  if (count > 1) { console.log('WARN multiple matches (' + count + '): ' + label); }
  html = html.replace(from, to);
  console.log('OK: ' + label);
}

// 1. Stats grid (6 columns) in Quienes somos
replaceOnce('stats-grid',
  '<div class="reveal" style="display:grid;grid-template-columns:repeat(6,1fr);border:1px solid #E0E0E0;border-radius:20px;overflow:hidden;margin-top:48px;">',
  '<div class="reveal sa-stats-grid" style="display:grid;grid-template-columns:repeat(6,1fr);border:1px solid #E0E0E0;border-radius:20px;overflow:hidden;margin-top:48px;">'
);

// 2. Purpose section inner 2-col grid (Aprendizaje clinico / Docentes activos)
replaceOnce('purpose-grid',
  '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;padding-top:32px;border-top:1px solid #E0E0E0;">',
  '<div class="sa-form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:20px;padding-top:32px;border-top:1px solid #E0E0E0;">'
);

// 3. Espacios section grid (1fr 1.6fr)
replaceOnce('espacios-grid',
  '<div class="sa-pad" style="max-width:1200px;margin:0 auto;padding:0 64px;display:grid;grid-template-columns:1fr 1.6fr;gap:80px;align-items:center;">',
  '<div class="sa-pad sa-espacios-grid" style="max-width:1200px;margin:0 auto;padding:0 64px;display:grid;grid-template-columns:1fr 1.6fr;gap:80px;align-items:center;">'
);

// 4. Espacios main image fixed height
replaceOnce('espacios-main-img',
  '<div style="position:relative;border-radius:20px;overflow:hidden;height:380px;background:#0D0D0D;">',
  '<div class="sa-esp-main" style="position:relative;border-radius:20px;overflow:hidden;height:380px;background:#0D0D0D;">'
);

// 5. CTA banner card padding
replaceOnce('cta-card',
  '<div class="reveal" style="background:#111;border-radius:40px;padding:80px 72px;text-align:center;position:relative;overflow:hidden;">',
  '<div class="reveal sa-cta-card" style="background:#111;border-radius:40px;padding:80px 72px;text-align:center;position:relative;overflow:hidden;">'
);

// 6. Contact form row (Nombre / Telefono)
replaceOnce('contact-form-row',
  '<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;"><div style="display:flex;flex-direction:column;gap:8px;"><label style="font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#888;">Nombre</label>',
  '<div class="sa-form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:24px;"><div style="display:flex;flex-direction:column;gap:8px;"><label style="font-size:11px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:#888;">Nombre</label>'
);

// 7. Footer main grid (2fr 1fr 1fr 1fr 1fr)
replaceOnce('footer-grid',
  '<div style="padding:28px 56px 20px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 40px; flex-wrap: wrap;">',
  '<div class="sa-footer-grid" style="padding:28px 56px 20px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 40px; flex-wrap: wrap;">'
);

// 8. Footer legal bar
replaceOnce('footer-legal',
  '<div style="padding:20px 56px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">',
  '<div class="sa-footer-legal" style="padding:20px 56px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">'
);

// 9. Skew (institute) cards - reduce fixed width on mobile via class already present (.skew-card)

// 10. Section vertical padding classes - add sa-section to major sections for mobile padding reduction
const sectionTargets = [
  ['quienes-somos section', '<section id="quienes-somos" style="background:#fff;padding:120px 0;">', '<section id="quienes-somos" class="sa-section" style="background:#fff;padding:120px 0;">'],
  ['proposito section', '<section id="proposito" style="padding: 120px 0; background-color: #F5F5F3">', '<section id="proposito" class="sa-section" style="padding: 120px 0; background-color: #F5F5F3">'],
  ['vision-mision section', '<section id="vision-mision" style="background:#111;padding:120px 0;">', '<section id="vision-mision" class="sa-section" style="background:#111;padding:120px 0;">'],
  ['valores section', '<section id="valores" style="padding: 120px 0; background-color: #F5F5F3">', '<section id="valores" class="sa-section" style="padding: 120px 0; background-color: #F5F5F3">'],
  ['espacios section', '<section id="espacios" style="background:#fff;padding:120px 0;">', '<section id="espacios" class="sa-section" style="background:#fff;padding:120px 0;">'],
  ['verticales section', '<section id="verticales" style="background:#0D0D0D;padding:120px 0;">', '<section id="verticales" class="sa-section" style="background:#0D0D0D;padding:120px 0;">'],
  ['colaboradores section', '<section id="colaboradores" style="background:#F5F5F3;padding:120px 0;">', '<section id="colaboradores" class="sa-section" style="background:#F5F5F3;padding:120px 0;">'],
  ['contacto section', '<section id="contacto" style="background:#F5F5F3;padding:120px 0;">', '<section id="contacto" class="sa-section" style="background:#F5F5F3;padding:120px 0;">'],
];
sectionTargets.forEach(([label, from, to]) => replaceOnce(label, from, to));

// CTA banner outer section (padding 80px 0, different pattern)
replaceOnce('cta-banner section',
  '<section style="background:#fff;padding:80px 0;">',
  '<section class="sa-cta-section" style="background:#fff;padding:80px 0;">'
);

fs.writeFileSync(file, html, 'utf8');
console.log('DONE');

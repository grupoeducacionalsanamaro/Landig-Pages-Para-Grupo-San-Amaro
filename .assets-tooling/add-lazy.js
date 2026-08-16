const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '../grupo-educacional-san-amaro/project');
const targetFiles = [
  'San Amaro Landing.dc.html',
  'Certificados.dc.html',
  'Inscripciones.dc.html',
  'Politicas Comerciales.dc.html',
  'Suscripciones.dc.html',
];

for (const tf of targetFiles) {
  const p = path.join(projectDir, tf);
  let content = fs.readFileSync(p, 'utf8');
  const navEndIdx = content.indexOf('</nav>');
  const cutoff = navEndIdx === -1 ? 0 : navEndIdx;

  let added = 0, skipped = 0;
  let result = '';
  let lastIndex = 0;
  const imgRe = /<img\b[^>]*>/g;
  let m;
  while ((m = imgRe.exec(content)) !== null) {
    result += content.slice(lastIndex, m.index);
    let tag = m[0];
    if (m.index < cutoff || /\bloading=/.test(tag)) {
      skipped++;
    } else {
      tag = tag.replace(/^<img\b/, '<img loading="lazy" decoding="async"');
      added++;
    }
    result += tag;
    lastIndex = imgRe.lastIndex;
  }
  result += content.slice(lastIndex);
  fs.writeFileSync(p, result, 'utf8');
  console.log(`${tf}: lazy added to ${added}, skipped (above fold / already set) ${skipped}`);
}

const fs = require('fs');
const p = '../grupo-educacional-san-amaro/project/index.html';
let html = fs.readFileSync(p, 'utf8');

const items = [
  'Programas Presenciales',
  'Programas Online',
  'Programas Internacionales',
  'Medicina Estética',
  'Dermoestética',
  'Odontología',
  'Armonización Orofacial',
  'Eventos',
  'Médicos',
  'Dentistas',
  'Enfermeras',
  'Dueños de Negocios del Área de la Salud',
];

const span = (text) => `      <span style="font-family:'Fraunces',serif;font-size:clamp(16px,2vw,22px);font-weight:400;color:#0D0D0D;padding:0 28px;font-style:italic;">${text}</span><span style="color:#ccc;font-size:18px;">\u25c6</span>`;
const groupHtml = items.map(span).join('\n');

const oldGroup = `      <span style="font-family:'Fraunces',serif;font-size:clamp(16px,2vw,22px);font-weight:400;color:#0D0D0D;padding:0 28px;font-style:italic;">Armonización Orofacial</span><span style="color:#ccc;font-size:18px;">\u25c6</span>
      <span style="font-family:'Fraunces',serif;font-size:clamp(16px,2vw,22px);font-weight:400;color:#0D0D0D;padding:0 28px;font-style:italic;">Medicina Dermoestética</span><span style="color:#ccc;font-size:18px;">\u25c6</span>
      <span style="font-family:'Fraunces',serif;font-size:clamp(16px,2vw,22px);font-weight:400;color:#0D0D0D;padding:0 28px;font-style:italic;">Odontología</span><span style="color:#ccc;font-size:18px;">\u25c6</span>
      <span style="font-family:'Fraunces',serif;font-size:clamp(16px,2vw,22px);font-weight:400;color:#0D0D0D;padding:0 28px;font-style:italic;">Gestión Clínica</span><span style="color:#ccc;font-size:18px;">\u25c6</span>
      <span style="font-family:'Fraunces',serif;font-size:clamp(16px,2vw,22px);font-weight:400;color:#0D0D0D;padding:0 28px;font-style:italic;">Kinesiología</span><span style="color:#ccc;font-size:18px;">\u25c6</span>`;

const count = html.split(oldGroup).length - 1;
console.log('occurrences found:', count);
html = html.split(oldGroup).join(groupHtml);
fs.writeFileSync(p, html, 'utf8');
console.log('done');

const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '../grupo-educacional-san-amaro/project');

const renames = [
  'GRUPO EDUCACIONAL SAN AMARO.png',
  'Diseño sin título (30).png',
  'Titulados.png',
  'Excelencia.jpg',
  'Innovación.jpg',
  'Comunidad.jpg',
  'Evolución.jpg',
  'Compromiso.jpg',
  '2026-04-14 14.30.07.jpg',
  '2025-02-25 09.42.27.jpg',
  '2025-02-25 09.43.14.jpg',
  '2025-02-25 09.45.05.jpg',
  '2025-02-25 09.46.41.jpg',
  '2025-02-25 09.47.15.jpg',
  '2025-02-25 09.48.12.jpg',
  '2025-02-25 09.48.52.jpg',
  '2025-02-25 09.49.08.jpg',
  '2025-02-25 09.57.27.jpg',
  'Harmoy Institute.png',
  'Harmoy Institute-fe9db893.png',
  'AGC Institute.png',
  'AGC Institute-c1c87334.png',
  'Simetria Institute.png',
  'Simetria Institute-ebd07fe9.png',
  'Premier Institute.png',
  'Premier Institute-90f850c8.png',
  'Koncepto Institute.png',
  'Koncepto Institute-ac830fd2.png',
  'Kinexia Institute.png',
  'Kinexia Institute-ea3f8a1c.png',
  'Alexis González.png',
  'Mariluz Pérez.png',
  'Zequelly Blanco.png',
  'Carla Ulloa.png',
  'Tamara Villagra.png',
  'Valeria Muñoz.png',
  'Carla Fuenmayor.png',
  'Dania Candia.png',
  'Elio Rincón.png',
  'LOGOS -  VARIANTES-03 (1).png',
];

const targetFiles = [
  'San Amaro Landing.dc.html',
  'Certificados.dc.html',
  'Inscripciones.dc.html',
  'Politicas Comerciales.dc.html',
  'Suscripciones.dc.html',
  'image-slot.js',
  'support.js',
];

for (const tf of targetFiles) {
  const p = path.join(projectDir, tf);
  if (!fs.existsSync(p)) continue;
  let content = fs.readFileSync(p, 'utf8');
  let count = 0;
  for (const oldName of renames) {
    const newName = oldName.replace(/\.(jpe?g|png)$/i, '.webp');
    const oldEsc = oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(oldEsc, 'g');
    const matches = content.match(re);
    if (matches) {
      count += matches.length;
      content = content.replace(re, newName);
    }
  }
  fs.writeFileSync(p, content, 'utf8');
  console.log(`${tf}: ${count} references updated`);
}

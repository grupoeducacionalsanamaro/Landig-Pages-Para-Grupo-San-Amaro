const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const uploadsDir = path.resolve(__dirname, '../grupo-educacional-san-amaro/project/uploads');
const backupDir = path.resolve(__dirname, 'originals-backup');
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

// [filename, maxDimension, quality]
const jobs = [
  ['GRUPO EDUCACIONAL SAN AMARO.png', 480, 90],
  ['Diseño sin título (30).png', 700, 85],
  ['Titulados.png', 1400, 82],
  ['Excelencia.jpg', 2000, 80],
  ['Innovación.jpg', 2000, 80],
  ['Comunidad.jpg', 2000, 80],
  ['Evolución.jpg', 1000, 85],
  ['Compromiso.jpg', 2000, 80],
  ['2026-04-14 14.30.07.jpg', 1600, 80],
  ['2025-02-25 09.42.27.jpg', 1600, 80],
  ['2025-02-25 09.43.14.jpg', 1600, 80],
  ['2025-02-25 09.45.05.jpg', 1600, 80],
  ['2025-02-25 09.46.41.jpg', 1600, 80],
  ['2025-02-25 09.47.15.jpg', 1600, 80],
  ['2025-02-25 09.48.12.jpg', 1600, 80],
  ['2025-02-25 09.48.52.jpg', 1600, 80],
  ['2025-02-25 09.49.08.jpg', 1600, 80],
  ['2025-02-25 09.57.27.jpg', 1600, 80],
  ['Harmoy Institute.png', 300, 85],
  ['Harmoy Institute-fe9db893.png', 300, 85],
  ['AGC Institute.png', 300, 85],
  ['AGC Institute-c1c87334.png', 300, 85],
  ['Simetria Institute.png', 300, 85],
  ['Simetria Institute-ebd07fe9.png', 300, 85],
  ['Premier Institute.png', 300, 85],
  ['Premier Institute-90f850c8.png', 300, 85],
  ['Koncepto Institute.png', 300, 85],
  ['Koncepto Institute-ac830fd2.png', 300, 85],
  ['Kinexia Institute.png', 300, 85],
  ['Kinexia Institute-ea3f8a1c.png', 300, 85],
  ['Alexis González.png', 800, 82],
  ['Mariluz Pérez.png', 800, 82],
  ['Zequelly Blanco.png', 800, 82],
  ['Carla Ulloa.png', 800, 82],
  ['Tamara Villagra.png', 800, 82],
  ['Valeria Muñoz.png', 800, 82],
  ['Carla Fuenmayor.png', 800, 82],
  ['Dania Candia.png', 800, 82],
  ['Elio Rincón.png', 800, 82],
  ['LOGOS -  VARIANTES-03 (1).png', 500, 85],
];

(async () => {
  let totalBefore = 0, totalAfter = 0;
  for (const [file, maxDim, quality] of jobs) {
    const srcPath = path.join(uploadsDir, file);
    if (!fs.existsSync(srcPath)) {
      console.log(`MISSING: ${file}`);
      continue;
    }
    const outName = file.replace(/\.(jpe?g|png)$/i, '.webp');
    const outPath = path.join(uploadsDir, outName);
    const before = fs.statSync(srcPath).size;

    await sharp(srcPath)
      .resize({ width: maxDim, height: maxDim, fit: 'inside', withoutEnlargement: true })
      .webp({ quality })
      .toFile(outPath);

    const after = fs.statSync(outPath).size;
    totalBefore += before;
    totalAfter += after;
    console.log(`${file} -> ${outName}: ${(before/1024).toFixed(0)}KB -> ${(after/1024).toFixed(0)}KB (${(100-100*after/before).toFixed(0)}% smaller)`);

    // back up and remove original from uploads
    fs.renameSync(srcPath, path.join(backupDir, file));
  }
  console.log('---');
  console.log(`TOTAL: ${(totalBefore/1024/1024).toFixed(1)}MB -> ${(totalAfter/1024/1024).toFixed(1)}MB`);
})();
